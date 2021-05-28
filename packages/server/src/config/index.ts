import { ConfigModuleOptions } from '@nestjs/config';
import { getEnvFilePath } from 'src/utils';
export const configObject = (): ConfigModuleOptions => ({
  envFilePath: getEnvFilePath(),
});
