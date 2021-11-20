import { Request, Response } from 'express';
import Pipeline from '@entities/Pipeline';
import Deal from '@entities/Deal';
import queryBuilder from '@utils/queryBuilder';

interface PipelineInterface {
  id?: string;
  name?: string;
}

class PipelineController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name }: PipelineInterface = req.body;

      if (!name) return res.status(400).json({ message: 'Invalid value for pipeline' });

      const existsPipeline = await Pipeline.findOne({ name });

      if (existsPipeline) return res.status(400).json({ message: 'Pipeline already exists' });

      const pipeline = await Pipeline.create({ name }).save();

      return res.status(201).json({id: pipeline.id, message: 'Pipeline created successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Create failed, try again' });
    }
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const pipeline = await Pipeline.find(queryBuilder(req.query));

      if (!pipeline) return res.status(400).json({ error: 'Cannot find Pipelines.' });

      return res.status(200).json(pipeline);
    } catch (error) {
      return res.status(404).json({ error: 'Get Pipeline Failed, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a pipeline id' });

      const pipeline = await Pipeline.findOne(id, queryBuilder(req.query));

      if (!pipeline) return res.status(400).json({ error: 'Cannot find Pipeline.' });

      return res.status(200).json(pipeline);
    } catch (error) {
      return res.status(404).json({ error: 'Get Pipeline Failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name }: PipelineInterface = req.body;
      const id = req.params.id;

      //if (!id) return res.status(400).json({ message: 'Please send a pipeline id' });

     //if (!name) return res.status(400).json({ error: 'Invalid value for pipeline' });

      const pipeline = await Pipeline.findOne(id);

      if (!pipeline) return res.status(404).json({ message: 'Pipeline does not exist' });

      await Pipeline.update(id, { name });

      return res.status(200).json({ message: 'Pipeline updated successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const pipeline = await Pipeline.findOne(id);

      if (!pipeline) return res.status(404).json({ message: 'Pipeline does not exist' });

      await Pipeline.softRemove(pipeline);

      const deals = await Deal.find({ where: { pipeline: pipeline.id } });

      deals.map(async (deal) => await Deal.update(deal.id, { status: 'ARCHIVED' }));

      return res.status(200).json({ message: 'Pipeline deleted successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Remove failed, try again' });
    }
  }
}

export default new PipelineController();
