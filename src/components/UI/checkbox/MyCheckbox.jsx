import React from 'react';
import classes from './MyCheckbox.module.css'

const MyCheckbox = (props) => {
    return (
        <div>
            <input type='checkbox' className={classes.myCheckbox} checked={props.checked}
                   onChange={props.onChange}
                   value={props.value} />
        </div>
    );
};

export default MyCheckbox;