
const userRoutes = (app, fs) => {

    // variables
    const dataPath = './data/anime.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/anime', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/anime', (req, res) => {

        readFile(data => {
            const newUserId = Object.keys(data).length + 1;

            // add the new user
            data[newUserId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new user added');
            });
        },
            true);
    });


    // UPDATE
    app.put('/anime/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const animeId = req.params["id"];
            data[animeId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`anime id:${animeId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/anime/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const animeId = req.params["id"];
            delete data[animeId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`anime id:${animeId} removed`);
            });
        },
            true);
    });
};

module.exports = userRoutes;