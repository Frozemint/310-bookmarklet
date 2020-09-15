javascript:(
    function() {
        const hahaFunnySegsNumber = 69;
        const hahaFunnyWeedNumber = 420;
        if (!document.getElementById("generate-button")) {
            console.stdlog = console.log.bind(console);
            console.logs = [];
            console.log = function () {
                console.logs.push(Array.from(arguments));
                console.stdlog.apply(console, arguments);
            };

            const pollForElement = (elem, timeout, callback) => {
                const intervalPoll = setInterval(() => {
                    const element = document.querySelector(elem);
                    if (element) {
                        clearInterval(intervalPoll);
                        callback();
                    };
                }, hahaFunnySegsNumber);
                setTimeout(() => clearInterval(intervalPoll), timeout);
            };

            /* https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard */
            const copyToClipboard = (text) => {
                const dummy = document.createElement("textarea");
                document.body.appendChild(dummy);
                dummy.value = text;
                dummy.select();
                document.execCommand("copy");
                document.body.removeChild(dummy);
            };

            const onClick = () => {
                if (!document.body.classList.contains('loading')) {
                    document.getElementById("submit-button").click();
    
                    pollForElement(".summary", 3000, () => {
                        setTimeout(() => {
                            const queryLog = console.logs[1];
                            const resultLog = console.logs[2];
                            console.logs = [];
                            const query = queryLog[0];
                            const result = resultLog && resultLog[1];
    
                            let obj;
    
                            if (result) {
                                obj = {
                                    title: "generated by https://github.com/ianmah/310-bookmarklet. Pls gib star",
                                    query,
                                    isQueryValid: true,
                                    ...result
                                }
                            } else {
                                const errorMessages = document.getElementsByClassName("error-message");
                                const errorMessage = errorMessages.length && errorMessages[0].textContent;

                                /* In the case that the button was spammed, there will be no result and no error message, do nothing.
                                    There should already be a valid test case in the clipboard by then */
                                if (errorMessage) {
                                    const errorType = (errorMessage.includes("Unexpected response status 400: The result is too big. Only queries with a maximum of 5000 results are supported.")) ? "ResultTooLargeError" : "InsightError";
                                    obj = {
                                        title: "generated by https://github.com/ianmah/310-bookmarklet. Pls gib star",
                                        query,
                                        isQueryValid: false,
                                        result: errorType
                                    };
                                }
                                
                            }

                            /* Do nothing if there is no object */
                            obj && copyToClipboard(JSON.stringify(obj, null, 4));
                            console.logs = [];
                        }, hahaFunnyWeedNumber);
                    });
                };
            };
    
            const parent = document.getElementById("submit-container");
            const button = document.createElement("a");
            button.innerHTML = "Copy Test File";
            button.id = "generate-button";
            button.className = "btn";
            button.href = "#!";
            button.onclick = onClick;
            parent.appendChild(button);
        }
    }
)();
