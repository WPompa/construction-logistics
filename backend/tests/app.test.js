const testingDataArr = require("./test-data");
const app = require("../server");
const request = require("supertest");

beforeAll(async () => {});

const routesToTest = testingDataArr.length;

for (let index = 0; routesToTest > index; index++) {
  const modelName = testingDataArr[index].modelName;
  const routeEndpoint = testingDataArr[index].routeEndpoint;
  const testDataArr = testingDataArr[index].testDataArr;

  testRoute(modelName, routeEndpoint, testDataArr);
}

function makeRequest(method, path, data = null, headers = {}) {
  let req = request(app)[method](path);

  if (Object.keys(headers).length > 0) {
    req = req.set(headers);
  }

  if (data) {
    req = req.send(data);
  }

  return req;
}

function testRoute(modelName, routeEndpoint, testDataArr) {
  const OptionOne = 0;
  const OptionTwo = 1;

  const [postTestData, putTestData, deleteTestData] = testDataArr;

  const headers = {
    Authorization: "Bearer Gu3$t",
  };

  const baseRoute = "/api/v1/";

  describe(`${modelName} API Endpoints Test`, () => {
    it(`creates two ${routeEndpoint}`, async () => {
      const responseOne = await makeRequest(
        "post",
        baseRoute + routeEndpoint,
        postTestData[OptionOne],
        headers,
      ).expect(201);

      const responseTwo = await makeRequest(
        "post",
        baseRoute + routeEndpoint,
        postTestData[OptionTwo],
        headers,
      ).expect(201);

      /* console.log(
        `//////////////////// ${modelName} created ////////////////////`,
      ); */
    });

    it(`modifies one ${routeEndpoint}`, async () => {
      const response = await makeRequest(
        "put",
        baseRoute + routeEndpoint,
        putTestData[OptionOne],
        headers,
      ).expect(200);

      /* console.log(
        `//////////////////// ${modelName} modified ////////////////////`,
      ); */
    });

    it(`deletes two ${routeEndpoint}`, async () => {
      const response = await makeRequest(
        "delete",
        baseRoute + routeEndpoint,
        deleteTestData[OptionOne],
        headers,
      ).expect(200);

      /* console.log(
        `//////////////////// ${modelName} deleted ////////////////////`,
      ); */
    });
  });
}
