import React from 'react';

function List ({ ssParticipants }) {
    const li = ssParticipants.map( ssParticipant => {
        return <li key = { ssParticipant.id }>Name: {ssParticipant.lastname}</li>
    }
    );

    return (
        <ul>
            { li }
        </ul>
    );

}

export default List;