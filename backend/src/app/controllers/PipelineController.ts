import { Request, Response } from 'express';
import Pipeline from '@entities/Pipeline';

interface PipelineInterface {
  id?: string;
  name?: string;
}

class PipelineController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name }: PipelineInterface = req.body;

      if (!name) return res.status(400).json({message: 'Invalid value for pipeline'});

      const existsPipeline = await Pipeline.findOne({ name });

      if (existsPipeline) return res.status(400).json({ message: 'Pipeline already exists' });

      const pipeline = await Pipeline.create({ name }).save();

      return res.status(201).json(pipeline.id);
    } catch (error) {
      return res.status(400).json({ error: 'Create failed, try again' });
    }
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const pipeline = await Pipeline.find();

      if (!pipeline) return res.status(400).json({ error: 'Cannot find Pipelines.' });

      return res.status(200).json(pipeline);
    } catch (error) {
      return res.status(400).json({ error: 'Get Pipeline Failed, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a pipeline id' });

      const pipeline = await Pipeline.findOne(id);

      if (!pipeline) return res.status(400).json({ error: 'Cannot find Pipeline.' });

      return res.status(200).json(pipeline);
    } catch (error) {
      return res.status(400).json({ error: 'Get Pipeline Failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name }: PipelineInterface = req.body;
      const id = req.params.id

      if (!id) return res.status(400).json({ message: 'Please send a pipeline id' });

      const pipeline = await Pipeline.findOne(id);

      if (!pipeline) return res.status(404).json({ message: 'Pipeline does not exist' });

      await Pipeline.update({ id }, { name });

      res.status(200).json();
    } catch (error) {
      console.log(error);
      
      return res.status(400).json({ error: 'Update Pipeline Failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id

      const pipeline = await Pipeline.findOne(id);

      if (!pipeline) return res.status(404).json({ message: 'Pipeline does not exist' });

      await Pipeline.softRemove(pipeline);

      res.status(200).json();
    } catch (error) {
      return res.status(400).json({ error: 'Update Pipeline Failed, try again' });
    }
  }
}

export default new PipelineController();
