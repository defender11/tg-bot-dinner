export class BaseController {
  constructor(app) {
    this.app = app;
  }
  
  async getModel(name = '') {
    if (name === '') {
      return null;
    }
    
    return this.app.modelsList[name];
  }
  
  async getDBModel(name = '') {
    if (name === '') {
      return null;
    }
    
    let modelTransport = await this.getModel(name);
    let model = await modelTransport.model;
    
    return model;
  }
}