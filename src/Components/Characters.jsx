import React,{useContext} from 'react';
import AppContext from "./AppContext";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import './Styles.css';


const GET_CHARACTERS = gql `
    query Characters($page: Int, $name: String, $status: String, $species:String, $type: String, $gender: String){
        characters(page: $page, filter:{name: $name, status: $status, species: $species, type: $type, gender: $gender}){
            info{
                prev,
                next
            },
            results{
                name,
                id,
                image
            }
        }
    }
`

const GET_CHARACTER = gql `
    query Character($id: ID!){
        character(id: $id){
            image,
            name,
            status,
            species,
            gender
        }
    }
`

function Characters (){
    const context = useContext(AppContext);
    const {loading,error,data} = useQuery(GET_CHARACTERS,{
        variables:{
            page:context.pages.get,
            name:context.search.get
        }
    });

    if (loading) return (<h1>Cargando...</h1>);
    if (error) return (<h2>{`${error}`}</h2>);

    //if (data && data.characters) context.chars.set(data.characters.info.pages); Esta forma es la mejor para guardar en el state,
                                                                                //pero me da un warning en el navegador

    return(
        <div className='body'>
            <div className='answer'>
                {data?
                <div className='results'>
                    <div className='chars'>
                        {data.characters.results.map((elem)=>{return <Character key={elem.id} id={elem.id} photo={elem.image} name={elem.name}/>})}
                    </div>
                    <div className='pages'>
                        {data.characters.info.prev?<h2 onClick={()=>context.pages.set(data.characters.info.prev)}>Prev</h2>:null}
                        {data.characters.info.next?<h2 onClick={()=>context.pages.set(data.characters.info.next)}>Next</h2>:null}
                    </div>
                </div>
                :null}
                {context.chars.get?
                    <div className='info'>
                        <Info id={context.chars.get}/>
                    </div>
                :null}
            </div>
        </div>
    );
}

function Character (props){
    const context = useContext(AppContext);
    const {photo, name, id} = props;

    return(
        <div className='char-card' onClick={()=>context.chars.set(id)}>
            <img className='photo' src={photo} alt="Error"/>
            <h4>{name}</h4>
        </div>
    );
}


function Info ({id}){
    const {loading, error, data} = useQuery(GET_CHARACTER,{
        variables: {id:id}
    });

    if (loading) return (<h1>Cargando...</h1>);
    if (error) return (<h2>{`${error}`}</h2>);

    return(
        <div className='info-card'>
            <img className='photo' src={data.character.image} alt="Error"/>
            <h3>{data.character.name}</h3>
            <p>{data.character.species}</p>
            <p>{data.character.gender}</p>
            <p>{data.character.status}</p>
        </div>
    );
}

export default Characters;