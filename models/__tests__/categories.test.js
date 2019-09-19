const Categories = require('../categories/categories.js');

describe('Categories Model', () => {

  let categories;

  beforeEach(() => {
    categories = new Categories();
  });

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = categories.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(categories.sanitize(testRecord)).toBeUndefined();
  });

  it('can post() a new category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can update an existing category', () => {
    let cat = { name: 'Old Test Category'};
    return categories.create(cat)
      .then(record => {
        expect(record.name).toEqual('Old Test Category');
        let changedRecord = { id: record.id, name: 'New Test Category' };
        return categories.update(record.id, changedRecord)
          .then(newCat => {
            Object.keys(newCat).forEach(() => {
              expect(changedRecord.name).not.toEqual(cat.name);
            });
          });
      });
  });

  it('can delete an existing category', () => {
    let cat = { name: 'Test Category' };
    return categories.create(cat)
      .then(record => {
        return categories.get(record.id)
          .then(record => {
            return categories.delete(record.id)
              .then(record => {
                expect(record).toBeUndefined();
              });
          });
      });
  });

});