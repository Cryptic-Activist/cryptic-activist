import { createChat } from 'base-ca';
import { Request, Response } from 'express';

// export async function index(req: Request, res: Response): Promise<Response> {
//   try {
//     console.log(req);
//   } catch (err) {
//     return res.status(500).send({
//       status_code: 500,
//       results: {},
//       errors: [err.message],
//     });
//   }
// }

export async function createChatController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { body } = req;
    const newChat = await createChat(body);

    return res.status(200).send({
      status_code: 200,
      results: newChat,
      errors: [],
    });
  } catch (err) {
    return res.status(500).send({
      status_code: 500,
      results: {},
      errors: [err.message],
    });
  }
}
