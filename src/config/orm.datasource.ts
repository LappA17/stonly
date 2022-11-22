import { DataSource } from 'typeorm';
import ormConfig from '@app/config/orm.config';

export default new DataSource(ormConfig);
