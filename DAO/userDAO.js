const checkUserdata = async function(connection,ID,PW){
    await connection.query(`SELECT ID,PW,Email FROM user_data where ID = ${ID} and PW = ${PW}`, async function (err, result) {
        if(err){
            return 1;
        }
        return 0;
    });
}
p

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
    setUserdata,
    deleteUserdata,
    checkUserdata
}