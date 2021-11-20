import Contact from '@entities/Contact';
import Company from '@entities/Company';
import Deal from '@entities/Deal';
import Pipeline from '@entities/Pipeline';
import { Request, Response } from 'express';
import User from '@entities/User';
import queryBuilder from '@utils/queryBuilder';

interface DealInteface {
  pipeline?: Pipeline;
  company?: Company;
  contact?: Contact;
  name?: string;
  deadline?: Date;
  priority?: string;
  value?: number;
  status?: string;
  activity?: ActivityInterface;
}

interface ActivityInterface {
  tag: string;
  name: string;
  createdAt: Date;
  createdBy: { id: string; name: string };
  description: string;
}

class DealController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const deal = await Deal.find(queryBuilder(req.query));
      // relations: ['company', 'contact', 'pipeline'],

      return res.status(200).json(deal);
    } catch (error) {
      return res.status(400).json({ error: 'Cannot find Deals, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const deal = await Deal.findOne(id, queryBuilder(req.query));
      // relations: ['company', 'contact', 'pipeline'],

      if (!deal) return res.status(404).json({ message: 'Deal does not exist' });

      return res.status(200).json(deal);
    } catch (error) {
      return res.status(400).json({ error: 'Cannot find Deal, try again' });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, deadline, priority, value, status, company, contact, pipeline }: DealInteface = req.body;
      const { tag } = req.body;

      if (!name || !company || !contact || !pipeline) return res.status(400).json({ message: 'Invalid values for Deal' });

      const createdBy = await User.findOne(req.userId);

      const deal = await Deal.create({
        name,
        company,
        contact,
        pipeline,
        deadline,
        priority,
        value,
        status,
        activity: [
          {
            tag: tag || 'HOT',
            name: 'Negociação iniciada',
            description: '',
            createdAt: new Date(),
            createdBy: { id: createdBy.id, name: createdBy.name },
          },
        ],
      }).save();

      if (!deal) return res.status(400).json({ message: 'Cannot create Deal' });

      return res.status(201).json({ id: deal.id });
    } catch (error) {
      return res.status(400).json({ error: 'Cannot create Deal, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, priority, value, status, company, contact, pipeline, deadline }: DealInteface = req.body;
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send Deal id' });

      const deal = await Deal.findOne(id, { relations: ['company', 'contact', 'pipeline'] });

      if (!deal) return res.status(404).json({ message: 'Deal does not exist' });

      const valuesToUpdate = {
        company: company || deal.company,
        contact: contact || deal.contact,
        pipeline: pipeline || deal.pipeline,
        priority: priority || deal.priority,
        deadline: deadline || deal.deadline,
        status: status || deal.status,
        value: value || deal.value,
        name: name || deal.name,
      };

      await Deal.update(id, { ...valuesToUpdate });

      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot update Deal, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send Deal id' });

      const deal = await Deal.findOne(id);

      if (!deal) return res.status(404).json({ message: 'Deal does not exist' });

      await Deal.softRemove(deal);

      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot delete Deal, try again' });
    }
  }

  public async insertActivity(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description, tag, createdAt }: ActivityInterface = req.body;
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send Deal id' });

      const createdBy = await User.findOne(req.userId);

      if (!name || !description || !tag || !createdAt || !createdBy)
        return res.status(400).json({ message: 'Invalid values to insert Activity' });

      const deal = await Deal.findOne(id);

      if (!deal) return res.status(404).json({ message: 'Deal does not exist' });

      deal.activity.push({ name, description, createdAt, tag, createdBy: { id: createdBy.id, name: createdBy.name } });

      await deal.save();

      return res.status(201).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot insert activity, try again' });
    }
  }

  public async pipelineUpdate(req: Request, res: Response): Promise<Response> {
    try {
      const { pipeline } = req.body;
      const id = req.params.id;

      const deal = await Deal.findOne(id);

      if (!deal) return res.status(404).json({ error: 'Deal not exist' });

      await Deal.update(id, { pipeline });

      return res.status(200).json();
    } catch (error) {
      return res.status(400).json({ error: 'Cannot update Deal pipeline, try again' });
    }
  }
}

export default new DealController();
