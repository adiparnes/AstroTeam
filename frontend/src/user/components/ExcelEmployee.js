import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExelEmployee = () => {

    const [users, setUsers] = useState();

    useEffect(() => {
        const fetchedData = async () => {
            const users = await axios('http://localhost:3001/users');
            console.log(users.data);
            let maxClosed = 0;
            let maxUsers = [];
            users.data.forEach(user => {
                console.log(user.closedTasksCounter)
                if (user.closedTasksCounter === maxClosed) {
                    maxUsers.push(user);
                }
                if (user.closedTasksCounter > maxClosed) {
                    maxClosed = user.closedTasksCounter;
                    maxUsers = [user]
                }
            });
            console.log(maxUsers);
            setUsers(maxUsers);
        }

        fetchedData();
    }, []);

    const employee = !users ? (<></>)
        : (
            <article className="message is-warning">
                <div className="message-body m-b-md">
                    <div className="level">
                        <div className="level-left">
                            <div className="icon m-r-sm">
                                <i className="fas fa-medal fa-lg"></i>
                            </div>
                            {users.map(u => <strong key={u._id}>{u.username} ,</strong>)}
                            <span className="m-l-sm"> leading the board!</span>
                        </div>
                        <div className="level-right">
                            <div className="p-r-sm">
                                <strong>{users[0].closedTasksCounter}
                                    <span className="p-xs">x</span>
                                </strong>
                                <div className="icon">
                                    <i className="fas fa-clipboard-check fa-lg"></i>
                                </div>
                            </div>
                                closed tasks
                        </div>
                    </div>

                </div>
            </article>
        )

    return (
        <>
            {employee}
        </>)
}

export default ExelEmployee