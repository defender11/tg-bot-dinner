import dotenv from 'dotenv';
import {printCLWithTime} from "../../Common/Log.js";

export class ApiAI {
  constructor() {
    dotenv.config();
    
    this.url = process.env.AI_API_URL;
    this.version = '/v1/';
    
    this.points = {
      models: 'models',
      chat: 'chat/completions',
    };
    
    this.bodyFetchRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    };
  }
  
  getPreparedBodyForRequest(msg = '', model = '') {
    return {
      model: model,
      messages: [
        {
          role: "user",
          content: msg,
        }
      ],
      temperature: 0.7,
      // "max_tokens": 200,
      stream: false
    }
  }
  
  getUrl(point = '') {
    return this.url + this.version + (this.points[point] ? this.points[point] : '');
  }


// Функция для выполнения запроса к одной модели
  async queryModel(model) {
    const response = await fetch(
      model.endpoint,
      Object.assign({body: JSON.stringify(model.body)}, this.bodyFetchRequest)
    );
    
    if (!response.ok) {
      throw new Error(`Ошибка запроса к ${model.endpoint}: ${response.status}`);
    }
    
    return response.json();
  }
  
  excludedModels() {
    return [
      'hermes-3-llama-3.2-3b',
      'deepseek-r1-distill-llama-8b',
      'deepseek-r1-distill-llama-8b@q4km',
      'deepseek-r1-distill-llama-8b@q4_k_m',
      
      'deepseek-r1-distill-llama-8b@q8_0',
      'deepseek-r1-distill-qwen-7b',
      
      
      'text-embedding-nomic-embed-text-v1.5',
    ]
  }
  
  async getAnswer(question = '') {
    let modelsList = [];
    try {
      printCLWithTime('log', 'Getting Models List');
      
      modelsList = await fetch(this.getUrl('models'))
        .then(response => response.json())
        .then(models =>
          models.data.length ? models.data
            .filter(model => !this.excludedModels().includes(model.id))
            .reduce((list, model) => [...list, model.id], []) : []
        );
      
      if (!modelsList.length) {
        printCLWithTime('error', 'Models not found.');
        return;
      }
    } catch (e) {
      printCLWithTime('error', 'Сouldn\'t get api data.', e.message);
      return;
    }
    
    printCLWithTime('log', modelsList);
    printCLWithTime('log', 'Prepared Models Request Data');
    
    const preparedModelsRequestData = modelsList.reduce(
      (list, model) => {
        return [
          ...list,
          {
            endpoint: this.getUrl('chat'),
            body: this.getPreparedBodyForRequest(question, model)
          }
        ];
      }, []);
    
    // Запускаем все запросы параллельно
    const modelPromises = preparedModelsRequestData.map(model => this.queryModel(model));
    
    printCLWithTime('log', 'Request Parallels to Answer');
    
    console.time('request_parallels_to_answer');
    
    return Promise.allSettled(modelPromises)
      .then(results => {
        const responseList = [];
        
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            let answer = result.value.choices[0].message.content;
            
            printCLWithTime('log', `Model ${index + 1} success responded:`, answer);
            
            let responseData = {
              model: result.value.model,
              usage: result.value.usage,
              question: question,
              answer: answer,
            };
            
            responseList.push(responseData);
          } else {
            printCLWithTime('log', `Error from model ${index + 1}:`, result.reason);
          }
        });
        
        console.timeEnd('request_parallels_to_answer');
        
        return responseList;
      });
  }
}




