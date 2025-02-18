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
}