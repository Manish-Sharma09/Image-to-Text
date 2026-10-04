// Runs the preprocessing pipeline off the main thread.
import { process, forget, type ProcessJob } from './process';

type Msg = { id: number; type: 'process'; job: ProcessJob } | { id: number; type: 'forget'; pageId: string };

self.onmessage = async (e: MessageEvent<Msg>) => {
  const msg = e.data;
  if (msg.type === 'forget') {
    forget(msg.pageId);
    return;
  }
  try {
    const result = await process(msg.job);
    const transfer: Transferable[] = result.bitmap ? [result.bitmap] : [];
    (self as unknown as Worker).postMessage({ id: msg.id, ok: true, result }, transfer);
  } catch (err) {
    (self as unknown as Worker).postMessage({ id: msg.id, ok: false, error: String((err as Error)?.message ?? err) });
  }
};
