import React, {useState, useEffect} from 'react';
import Api from '../Api';
import './NewChat.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';

export default ({user, chatlist, show, setShow}) => {
    const [list, setList] = useState([])

    useEffect(() => {
        const getList = async () => {
            if(user !== null) {
                let results = await Api.getContactList(user.id);
                setList(results);
            }
        }
        getList()
        }, [user]);

    const addNewChat = async (user2) => { 
        await Api.addNewChat(user, user2);

        handleClose();
    }

    const handleClose = () => {
        setShow(false);
    }

    return (
        <div className="newChat" style={{left: show ? 0 : -415}}>
            <div className="newChat--head">
                <div onClick={handleClose} className="newChat--backbutton">
                    <ArrowBackIcon style={{color: '#FFFFFF'}}/>
                </div>
                <div className="newChat--headtitle">
                New Chat
                </div>
            </div>
            <div className="search">
                <div className="search--input">
                    <SearchIcon fontSize="small" style={{color: '#919191'}} />
                    <input type="search" placeholder="Search contacts">

                    </input>
                </div>
            </div>
            <div className="newChat--list">
                {list.map((item, key) => (
                    <div onClick={()=>addNewChat(item)}  className="newChat--item" key={key}>
                        <img className="newChat--itemavatar" src={item.avatar} alt="" />
                        <div className="newChat--itemname">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}