'use strict';

const uuid = require('uuid/v4');

class Model {
  constructor(){
    this.database = [];
  }
  get(id){
    let output = id ? this.database.filter(element=> (element.id==id)):this.database;
    return output;
  }
  create(input){
    input.id = uuid();
    this.database.push(input);
    return Promise.resolve(this.database);    
  }
  update(id,edit){
    this.database = this.database.map(element=>(element.id == id)? edit : element);
    return Promise.resolve(this.database); 
  }
  delete(id){
    this.database = this.database.filter(element =>(element.id !==id));
    return Promise.resolve();
  }
}

module.exports = Model;