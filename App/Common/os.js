
import os from "os";
export const localIP = Object.values(os.networkInterfaces())
  .flat()
  .find(iface => iface.family === 'IPv4' && !iface.internal)
  ?.address;