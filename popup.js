import {Heimdall, TidePromise} from "http://localhost:6001/src/heimdall.js"
    
    const config = {
    vendorPublic: "fz8ExWfL/RuTlUElkzVEnvhhzikyK88TPhJwyXCc3WE=",
    vendorLocationSignature: "AwKCdhDIgqUhpirdrVlw8TVj6b7FWErx5u7iE9ZDky+vW418Vr9pTeE7xUgkTipZoANXj1DS2o1DREljoh7SCg==",
    homeORKUrl: "http://localhost:1001",
    enclaveRequest: {
        getUserInfoFirst: false, // 1 step process - we will not supply a customModel halfway through the process
        refreshToken: true, // I want a TideJWT returned
        customModel: undefined // I do not want to provide a customModel
    }
    }

    const heimdall = new Heimdall(config);
    const tidePromise = new TidePromise(); // a TidePromise which allows us to get the values from the FULL sign in process
    const tideButtonAction = async (promise) => heimdall.GetCompleted(promise); // describe what we want the tide button to do
    const tideButton = heimdall.AddTideButton(tideButtonAction, tidePromise); // returns Tide Button for you to stylise

    const values = await tidePromise.promise;

    document.getElementById("work").innerHTML = values.TideJWT;