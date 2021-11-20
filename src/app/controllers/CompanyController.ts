import Company from '@entities/Company';
import queryBuilder from '@utils/queryBuilder';
import { Request, Response } from 'express';

interface CompanyInterface {
  id?: string;
  name?: string;
  country?: string;
  state?: string;
  city?: string;
  site?: string;
  picture?: string;
}

class CompanyController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const companies = await Company.find(queryBuilder(req.query));

      return res.status(200).json(companies);
    } catch (error) {
      return res.status(404).json({ message: 'Cannot find companies, try again' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a company id' });

      const company = await Company.findOne(id, queryBuilder(req.query));

      return res.status(200).json(company);
    } catch (error) {
      return res.status(404).json({ message: 'Cannot find companies, try again' });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, country, state, city, site, picture }: CompanyInterface = req.body;

      if (!name) return res.status(400).json({ message: 'Invalid company name' });

      const company = await Company.create({ name, country, state, city, site, picture }).save();

      if (!company) return res.status(400).json({ message: 'Cannot create company' });

      return res.status(201).json({ id: company.id, message: 'Company created successfully' });
    } catch (error) {
      return res.status(404).json({ message: 'Create failed, try again' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { name, country, state, city, site, picture }: CompanyInterface = req.body;
      const id = req.params.id;

      const company = await Company.findOne(id);

      if (!company) return res.status(404).json({ message: 'Company does not exist' });

      const valuesToUpdate: CompanyInterface = {
        country: country || company.country,
        state: state || company.state,
        name: name || company.name,
        city: city || company.city,
        site: site || company.site,
        picture: picture || company.picture,
      };

      await Company.update(id, { ...valuesToUpdate });

      return res.status(200).json({ message: 'Company updated successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'Update failed, try again' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!id) return res.status(400).json({ message: 'Please send a company id' });

      const company = await Company.findOne(id);

      if (!company) return res.status(404).json({ message: 'Cannot find company' });

      await Company.softRemove(company);

      return res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: 'Remove failed, try again' });
    }
  }
}

export default new CompanyController();
