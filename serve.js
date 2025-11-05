import { serve } from "https://deno.land/std@0.207.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.207.0/http/file_server.ts";

serve(async (req) => {
  return await serveDir(req, {
    fsRoot: "./", // 服务器将从当前目录提供文件
    urlRoot: "", // URL 路径的基础路径
    showDirListing: true, // 可选，是否显示目录列表
    enableCors: true, // 可选，启用 CORS
  });
});