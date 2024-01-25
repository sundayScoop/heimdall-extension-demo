import {Heimdall, TidePromise, FieldData} from "http://localhost:6001/src/heimdall.js"
    
    const config = {
        vendorPublic: "AgIFaWlodL1X/4ndGXq/9P+1QqFnshIUzH/TfX1skgg=",
        vendorLocationSignature: "5/EHRJaaIsWUSSegx4icRvL7mFjafQrUZ3NVujuN0NYC4V+rjLUghxB0cUOwrUgwHg6wLzKJnkgVjeNw6Tw4Bw==",
        homeORKUrl: "http://localhost:1001",
        enclaveRequest: {
            refreshToken: true, // I want a TideJWT returned
            customModel: undefined // I do not want to provide a customModel
        }
    }

    const heimdall = new Heimdall(config);
    const tidePromise = new TidePromise(); // a TidePromise which allows us to get the values from the FULL sign in process
    const tideButtonAction = async (promise) => heimdall.GetUserInfo(promise); // describe what we want the tide button to do
    const tideButton = heimdall.AddTideButton(tideButtonAction, tidePromise); // returns Tide Button for you to stylise

    const values = await tidePromise.promise;

    document.getElementById("hey").innerHTML = values.UID;

    
    // i need the uid
    const enc = new TextEncoder();
    const dec = new TextDecoder();

    // time to encrypt some data
    // create fieldData
    const encryptPromise = new TidePromise();
    const idList = ["password", "username"]
    const fieldData = new FieldData(idList);
    fieldData.add(enc.encode("test to encrypt"), ["password"]);
    fieldData.add(enc.encode("test to encrypt"), ["password"]);
    fieldData.add(enc.encode("test to encrypt"), ["password"]);


    const ac2 = async(params) => {
        return await heimdall.EncryptUserData(params);
    }
    const params = [values.UID, fieldData, encryptPromise];
    const tBtn2 = heimdall.AddTideButton(ac2, params);
    tBtn2.style.background = "blue";
    
    const serializedFields = await encryptPromise.promise;

    console.log(serializedFields)
    document.getElementById("hey2").innerHTML = serializedFields[0];

    const decryptPromise = new TidePromise();
    const ac3 = async(params) => {
        return await heimdall.DecryptUserData(params);
    }
    const params2 = [values.UID, serializedFields, decryptPromise];
    const tBtn3 = heimdall.AddTideButton(ac3, params2);
    tBtn3.style.background = "purple";

    const decrypted = await decryptPromise.promise;
    const fieldData2 = new FieldData(idList);
    fieldData2.addManyWithTag(decrypted);
    const fdIds = fieldData2.getAllWithIds();
    document.getElementById("hey3").innerHTML = dec.decode(fdIds[0].Data);