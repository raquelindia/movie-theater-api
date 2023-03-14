const {db} = require("../db");
const {User, Show} = require("./index");

describe('Test Models', () => {
    beforeAll(async () => {
        await db.sync({ force: true});
    })

 test('create users', async () => {
    const testUser1 = await User.create({ username: 'jasmine', password: 'kkdxnfdk'});
    const testUser2 = await User.create({ username: 'hannah', password: 'jdfnkej'});
      
       expect(testUser1.username).toBe('jasmine');
        expect(testUser1.password).toBe('kkdxnfdk');
        expect(testUser2.username).toBe('hannah');
        expect(testUser2.password).toBe('jdfnkej');
        
 } )

 test('create shows', async () => {
    const testShow1 = await Show.create({ title: "True Blood", genre: "Drama", rating: 10, status: "cancelled"});
    const testShow2 = await Show.create({title: "Friends", genre: "Sitcom", rating: 5, status: "cancelled"});
      
       expect(testShow1.title).toBe('True Blood');
        expect(testShow1.rating).toBe(10);
        expect(testShow2.genre).toBe('Sitcom');
        expect(testShow2.status).toBe('cancelled');
        
 } )

 test('test associations', async () => {
    const createUser1 = await User.create({username: 'Jada', password: "kjndef"});
    const createUser2 = await User.create({username: 'Whitney', password: "jfsnj"})
    const createShow1 = await Show.create({title: "Teen Wolf", genre: "Drama", rating: 8, status: "on-going"});
    const createShow2 = await Show.create({title: "iCarly", genre: "Comedy", rating: 10, status: "on-going"});
    await createUser1.setShows([createShow1, createShow2]);
    await createUser2.setShows([createShow2]);
    const foundUser = await User.findAll({ include: Show, as: "shows"});


    const showPath1 = foundUser[0].shows[1].title;
    const showPath2 = foundUser[1].shows[0].genre;
   

    expect(showPath1).toBe("iCarly");
    expect(showPath2).toBe("Drama")
   

 } )

})
