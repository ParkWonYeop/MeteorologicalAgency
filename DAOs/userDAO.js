const getUserdata = async function(connection){
    await connection.query(`SELECT ID,PW,Email FROM user_data`, async function (err, result) {
        if(err){
            return 1;
        }
        const userData = {
            ID:result[0].ID,
            PW:result[0].PW,
            Email:result[0].Email
        }
        return userData;
    });
}

const checkUserdata = async function(connection,ID,PW){
    await connection.query(`SELECT ID,PW,Email FROM user_data where ID = ${ID} and PW = ${PW}`, async function (err, result) {
        if(err){
            return 1;
        }
        return 0;
    });
}

const getUserID = async function(connection){
    await connection.query(`SELECT ID FROM user_data`, async function (err, result) {
        if(err){
            return 1;
        }
        const userID = result[0].ID;
        return userID;
    });
}

const getUserPW = async function(connection){
    await connection.query(`SELECT ID FROM user_data`, async function (err, result) {
        if(err){
            return 1;
        }
        const userPW = result[0].PW;
        return userPW;
    });
}

const getUserEmail = async function(connection){
    await connection.query(`SELECT ID FROM user_data`, async function (err, result) {
        if(err){
            return 1;
        }
        const userEmail = result[0].Email;
        return userEmail;
    });
}

const setUserdata = async function(connection,ID,PW,Email){
    await connection.query(`INSERT INTO user_data (ID,PW,Email) VALUES (${ID},${PW},${Email})`,function (err) {
        if (err) {
            return 1;
        }
            return 0;
        },
    );
}

const deleteUserdata = async function(connection,ID,PW){
    await connection.query(`DELETE FROM user_data where ID = ${ID} and PW = ${PW}`,async function (err) {
        if (err) {
            return 1
        }
        return 0;
        },
      );
}

module.exports = {
    getUserdata,
    getUserEmail,
    getUserID,
    getUserPW,
    setUserdata,
    deleteUserdata,
    checkUserdata
}