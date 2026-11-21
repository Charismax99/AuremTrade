import { defineCliConfig } from 'sanity/cli';
import { dataset, projectId } from '../src/lib/blog/config';

export default defineCliConfig({
  api: { projectId, dataset },
});
