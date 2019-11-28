import React from 'react';
import Comment from './Comment';
import faker from 'faker';

const App = () => {

    const generateComment = () => ({
        img: faker.image.avatar(),
        author: faker.name.firstName(),
        date: faker.date.past().toLocaleDateString(),
        text: faker.lorem.sentence()
    });

    const comments = [generateComment(),generateComment(),generateComment(),generateComment(),generateComment()];

    return (
        <div className="app">
            <div class="ui comments">
                {/* Example 1: generate Comment */}
                <Comment comment={generateComment()}></Comment>
                
                {/* Example 2: Array of comments previously generated. */}
                { comments.map( (value, key) => {return <Comment comment={value}></Comment>} ) }
            </div>
        </div>
    )
}

export default App;