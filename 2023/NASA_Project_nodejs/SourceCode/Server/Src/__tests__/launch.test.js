const request = require('supertest');
const app = require('../app');

// test fixture's they start with describe()
describe( 'Test GET /launches', () => {

    // API that's getting tested
  test('should respond with 200 success', async () => {
    // const response = await request( app ).get('/launches');

    // //assertion statements
    // expect( response.statusCode ).toBe( 200 );
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/) //supertest assertion's
      .expect(200); //supertest assertion's
  });
  
});

describe( 'Test POST /launches', () => {

    const launchWithCompleteDate = {
      mission: "USS enterprise",
      rocket: "1k234",
      target: "kepler-28",
      launchDate: "January 4, 2028",
    };

    const launchWithoutDate = {
      mission: "USS enterprise",
      rocket: "1k234",
      target: "kepler-28",
    };

    const invalidLaunchDate = {
      mission: "USS enterprise",
      rocket: "1k234",
      target: "kepler-28",
      launchDate: "hello",
    };

  test('should respond with 200 success', async () => {
    
    
    const res = await request(app)
      .post("/launches")
      .send(launchWithCompleteDate)
      .expect("Content-Type", /json/)
      .expect(201); // 201 CREATED

    const reqDate = new Date( launchWithCompleteDate.launchDate ).valueOf();
    const responseDate = new Date( res.body.launchDate ).valueOf() ;

    expect( reqDate ).toBe( responseDate );

    expect(res.body).toMatchObject( launchWithoutDate );
    

  });


  test('should catch missing required properties', async () => {
    
    const res = await request(app)
      .post("/launches")
      .send( launchWithoutDate )
      .expect("Content-Type", /json/)
      .expect( 400 ); 

    expect(res.body).toStrictEqual({
      error: "missing required launch property",
    });

  });

        

  test('should catch invalid dates', async () => {
    
    const res = await request(app)
      .post("/launches")
      .send( invalidLaunchDate )
      .expect("Content-Type", /json/)
      .expect( 400 ); 

    expect(res.body).toStrictEqual({
            "error": 'invalid date'
        });

  });

})

