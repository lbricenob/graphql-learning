import data from '../data/sessions.json';
import { DataSource } from 'apollo-datasource';

export class SessionAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) { }

  getSessions() {
    return data;
  }
}
