import { Model } from 'sequelize';

export const mapAssociations = (model: Model) =>
  model.get({ plain: true });

export const mapArrayAssociations = (models: Model[]) =>
  models.map((model) => model.get({ plain: true }));
