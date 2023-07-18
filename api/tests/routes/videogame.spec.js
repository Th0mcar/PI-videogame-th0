/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'TESTING',
  description: 'es un testing/es un testing/es un testing/es un testing/es un testing/es un testing/es un testing/es un testing/es un testing/es un testing/es un testing/es un testing/es un testing/es un testing/es un testing',
  platform: ['PC', 'Xbox One'],
  background_image: 'https://kinsta.com/es/wp-content/uploads/sites/8/2021/07/performance-testing-tools-1024x512.png',
  released: '2023-07-16',
  rating: 4.99,
  genres: ['Action', 'Shooter']
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', function (done){
      this.timeout(8000);
      agent.get('/Videogames').expect(200, done);
    }
    );
  });
});
