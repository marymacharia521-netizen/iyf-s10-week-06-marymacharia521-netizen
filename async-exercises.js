const lesson11Output = document.getElementById("lesson11-output");

function addLesson11Block(title, content) {
    const article = document.createElement("article");
    article.className = "exercise-card";
    article.innerHTML = `
        <h2>${title}</h2>
        <pre>${content}</pre>
    `;
    lesson11Output.appendChild(article);
}

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function loadUser(userId, callback) {
    setTimeout(() => {
        callback({
            id: userId,
            name: "Mary Macharia",
            role: "Student"
        });
    }, 1500);
}

function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: `User ${userId}` });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 1, title: `Post 1 by user ${userId}` },
                    { id: 2, title: `Post 2 by user ${userId}` }
                ]);
            } else {
                reject(new Error("Could not load posts"));
            }
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, text: "Helpful post!" },
                    { id: 2, text: "Async JavaScript is making sense now." }
                ]);
            } else {
                reject(new Error("Could not load comments"));
            }
        }, 1000);
    });
}

async function runLesson11Exercises() {
    addLesson11Block(
        "Task 11.1: Predict the Output",
        [
            "console.log('A')",
            "setTimeout(() => console.log('B'), 0)",
            "console.log('C')",
            "setTimeout(() => console.log('D'), 100)",
            "console.log('E')",
            "",
            "Expected order: A, C, E, B, D"
        ].join("\n")
    );

    await new Promise((resolve) => {
        loadUser(1, (user) => {
            addLesson11Block(
                "Task 11.1: Callback Pattern",
                `Loaded after 1.5 seconds:\n${JSON.stringify(user, null, 2)}`
            );
            resolve();
        });
    });

    const callbackHellOutput = [];

    await new Promise((resolve) => {
        getUserData(1)
            .then((user) => {
                callbackHellOutput.push(`User: ${JSON.stringify(user)}`);
                return getUserPosts(user.id);
            })
            .then((posts) => {
                callbackHellOutput.push(`Posts: ${JSON.stringify(posts)}`);
                return getPostComments(posts[0].id);
            })
            .then((comments) => {
                callbackHellOutput.push(`Comments: ${JSON.stringify(comments)}`);
                addLesson11Block(
                    "Task 11.2 and 11.3: Promises and Promise Chaining",
                    callbackHellOutput.join("\n\n")
                );
                resolve();
            })
            .catch((error) => {
                addLesson11Block(
                    "Task 11.2 and 11.3: Promises and Promise Chaining",
                    `Error: ${error.message}`
                );
                resolve();
            });
    });

    try {
        const users = await Promise.all([
            getUserData(1),
            getUserData(2),
            getUserData(3)
        ]);

        addLesson11Block(
            "Task 11.3: Promise.all",
            `Fetched 3 users in parallel:\n${JSON.stringify(users, null, 2)}`
        );
    } catch (error) {
        addLesson11Block("Task 11.3: Promise.all", `Error: ${error.message}`);
    }

    const raceWinner = await Promise.race([
        wait(100).then(() => "Fast result"),
        wait(500).then(() => "Slow result")
    ]);

    addLesson11Block(
        "Task 11.3: Promise.race",
        `Winner: ${raceWinner}`
    );

    try {
        const user = await getUserData(1);
        const posts = await getUserPosts(user.id);
        const comments = await getPostComments(posts[0].id);

        addLesson11Block(
            "Task 11.4: Async/Await Rewrite",
            [
                `User: ${JSON.stringify(user)}`,
                `Posts: ${JSON.stringify(posts)}`,
                `Comments: ${JSON.stringify(comments)}`
            ].join("\n\n")
        );
    } catch (error) {
        addLesson11Block("Task 11.4: Async/Await Rewrite", `Error: ${error.message}`);
    }
}

runLesson11Exercises();
