import { EStatus } from '../models/EStatus.enum';
import { EPriority } from '../models/EPriority.enum';
export const BASE_URL = 'http://localhost:8000/api/';

export const STATUS_OPTIOS: EStatus[] = [EStatus.REALIZATION, EStatus.COMPLETED, EStatus.PROGRESS, EStatus.CANCELED];
export const PRIORITY_OPTIONS: EPriority[] = [EPriority.LOW, EPriority.MEDIUM, EPriority.HIGH];

export const CLIENT_URL = 'http://localhost:5173/';