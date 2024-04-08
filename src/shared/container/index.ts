import { container } from 'tsyringe';

import './providers';

import IScoresRepository from '@modules/scores/repositories/IScoresRepository';
import ScoresRepository from '@modules/scores/infra/typeorm/repositories/ScoresRepository';

import IMarkingsRepository from '@modules/markings/repositories/IMarkingsRepository';
import MarkingsRepository from '@modules/markings/infra/typeorm/repositories/MarkingsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

import IProducersRepository from '@modules/producers/repositories/IProducersRepository';
import ProducersRepository from '@modules/producers/infra/typeorm/repositories/ProducersRepository';

import IProducersTokensRepository from '@modules/producers/repositories/IProducersTokensRepository';
import ProducersTokensRepository from '@modules/producers/infra/typeorm/repositories/ProducersTokensRepository';

import IFarmsRepository from '@modules/farms/repositories/IFarmsRepository';
import FarmsRepository from '@modules/farms/infra/typeorm/repositories/FarmsRepository';

import IFarmsTokensRepository from '@modules/farms/repositories/IFarmsTokensRepository';
import FarmsTokensRepository from '@modules/farms/infra/typeorm/repositories/FarmsTokensRepository';

container.registerSingleton<IScoresRepository>(
  'ScoresRepository',
  ScoresRepository,
);

container.registerSingleton<IMarkingsRepository>(
  'MarkingsRepository',
  MarkingsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<IProducersRepository>(
  'ProducersRepository',
  ProducersRepository,
);

container.registerSingleton<IProducersTokensRepository>(
  'ProducersTokensRepository',
  ProducersTokensRepository,
);

container.registerSingleton<IFarmsRepository>(
  'FarmsRepository',
  FarmsRepository,
);

container.registerSingleton<IFarmsTokensRepository>(
  'FarmsTokensRepository',
  FarmsTokensRepository,
);
