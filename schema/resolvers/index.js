import _ from 'lodash';
import User from './User';
import Category from './Category';
import Ficha from './Ficha';

const resolvers = {};

export default _.merge(resolvers,User,Category,Ficha)


