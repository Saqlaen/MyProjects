# Erros i ran into

### getting these after implementing mongoose tried running jest

<details>
    <summary>mongoose connection ERROR</summary>

        FAIL  Src/__tests__/launch.test.js (46.268 s)
        Test GET /launches
            ✕ should respond with 200 success (5078 ms)
        Test POST /launches
            ✕ should respond with 200 success (5004 ms)
            ✓ should catch missing required properties (11 ms)
            ✓ should catch invalid dates (7 ms)

        ● Test GET /launches › should respond with 200 success

            thrown: "Exceeded timeout of 5000 ms for a test.
            Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

            6 |
            7 |     // API that's getting tested
            >  8 |   test('should respond with 200 success', async () => {
                |   ^
            9 |     // const response = await request( app ).get('/launches');
            10 |
            11 |     // //assertion statements

            at test (Src/__tests__/launch.test.js:8:3)
            at Object.describe (Src/__tests__/launch.test.js:5:1)

        ● Test POST /launches › should respond with 200 success

            thrown: "Exceeded timeout of 5000 ms for a test.
            Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

            41 |     };
            42 |
            > 43 |   test('should respond with 200 success', async () => {
                |   ^
            44 |
            45 |
            46 |     const res = await request(app)

            at test (Src/__tests__/launch.test.js:43:3)
            at Object.describe (Src/__tests__/launch.test.js:21:1)

        /mnt/d/DevDiscovery/MyProjects/2023/NASA_Project_nodejs/SourceCode/Server/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:186
                const err = new MongooseError(message);                                                                                                                          
        MongooseError: Operation `launches.find()` buffering timed out after 10000ms                                                                                                                                                         
            at Timeout.anonymous (/mnt/d/DevDiscovery/MyProjects/2023/NASA_Project_nodejs/SourceCode/Server/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:186:23)                                                    
            at listOnTimeout (node:internal/timers:573:17)
            at processTimers (node:internal/timers:514:7)

        Node.js v21.4.0
        Test Suites: 1 failed, 1 total
        Tests:       2 failed, 2 passed, 4 total
        Snapshots:   0 total
        Time:        49.12 s
        Ran all test suites related to changed files.
</details>

```
this error was caused becuase app was not having a mongodb connection 
which is in server.js 
to fix this we create a file with mongo db connection which can be used in server.js 
as well as lauch.test.js
```

<details>
    <summary> getting jest did not exit message</summary>

    (node:1647) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
    (Use `node --trace-deprecation ...` to show where the warning was created)
    console.log
        MongoDB connection ready
        at NativeConnection.log (Src/Common/mongo.js:10:11)
    ::ffff:127.0.0.1 - - [09/Dec/2023:10:09:48 +0000] "GET /launches HTTP/1.1" 200 2 "-" "-"
    ::ffff:127.0.0.1 - - [09/Dec/2023:10:09:53 +0000] "POST /launches HTTP/1.1" 400 44 "-" "-"
    ::ffff:127.0.0.1 - - [09/Dec/2023:10:09:53 +0000] "POST /launches HTTP/1.1" 400 24 "-" "-"
    FAIL  Src/__tests__/launch.test.js (28.342 s)                                                                                                
    Test Launches API
        Test GET /launches                                                                                                                            
        ✓ should respond with 200 success (362 ms)                                                                                                     
        Test POST /launches                                                                                                                          
        ✕ should respond with 200 success (5001 ms)                               
        ✓ should catch missing required properties (7 ms)
        ✓ should catch invalid dates (4 ms)                                                                           
    ● Test Launches API › Test POST /launches › should respond with 200 success                                                                                                                                     
        Noo matching planet was found

        26 |
        27 |     if( !planet ){
        > 28 |         throw new Error( 'Noo matching planet was found');
            |               ^
        29 |     }
        30 |
        31 |     await launches.findOneAndUpdate( {

        at saveLaunch (Src/Models/launches.model.js:28:15)
        at addNewLaunch (Src/Models/launches.model.js:63:5)
        at httpAddNewLaunch (Src/Routes/Controller/launch.controller.js:33:5)

    ● Test Launches API › Test POST /launches › should respond with 200 success

        thrown: "Exceeded timeout of 5000 ms for a test.
        Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

        53 |         };
        54 |
        > 55 |       test('should respond with 200 success', async () => {
            |       ^
        56 |
        57 |
        58 |         const res = await request(app)

        at test (Src/__tests__/launch.test.js:55:7)
        at describe (Src/__tests__/launch.test.js:33:5)
        at Object.describe (Src/__tests__/launch.test.js:10:1)

    Test Suites: 1 failed, 1 total
    Tests:       1 failed, 3 passed, 4 total
    Snapshots:   0 total
    Time:        29.554 s, estimated 35 s
    Ran all test suites.
    Jest did not exit one second after the test run has completed.
    'This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.


</details>

```
1. we can try disconnecting mongo manually in test.js
```