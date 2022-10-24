import { BackendRowModel, ProjectId } from '../Models/row';
import { MOCK_ROWS } from './mock';

export default class RowService {
  static async fetchRowsByProjectId( id: ProjectId ): Promise<BackendRowModel[]> {
    const _ = await new Promise(( res ) => {

      setTimeout(res, 16);
    });

    return MOCK_ROWS;
  }
}
