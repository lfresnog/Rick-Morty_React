import React,{useContext} from 'react';
import AppContext from "./AppContext";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_CHARACTERS = gql `
    query Characters($page: Int, $name: String, $status: String, $species:String, $type: String, $gender: String){
        characters(page: $page, filter:{name: $name, status: $status, species: $species, type: $type, gender: $gender}){
            info{
                pages
            },
            results{
                name,
                id
            }
        }
    }
`

function Test({name}){
    const context = useContext(AppContext);
    const {loading, error, data} = useQuery(GET_CHARACTERS,{
        variables: {name:name},
        onCompleted: context.chars.set
    });

    if (loading) return (<h1>Cargando...</h1>);
    if (error) return (<h2>{`${error}`}</h2>);
    
    return(
        <div>
            {data.characters.results.map((elem)=>{return <h3 key={elem.id}>{elem.name}</h3>})}
        </div>
    );
}

export default Test;