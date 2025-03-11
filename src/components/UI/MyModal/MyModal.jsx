import React from 'react';
import classes from './MyModal.module.css'

const MyModal = ({children, visible, setVisible}) => {
    const cl = [classes.myModal];

    if(visible) {
        cl.push(classes.active)
    }

    return (
        <div className={cl.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;