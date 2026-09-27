# STATION-CLINIC-STATUS · Northvale Clinic

> 日期：2026-09-28  
> 生产：https://slice-clinic-app.vercel.app  
> Prismic：`slice-clinic` **待建** · GitHub：`Amazong110/slice-clinic`

---

## 位置判断

`clients/` 下原无诊所站 → 新建 `/home/ubuntu/clients/slice-clinic/`。骨架取自律师站（餐厅 playbook 的行业化落地：同构 App Router + kit slices + 柔和光晕底），非直接整仓复制餐厅菜单站。

---

## 自评（QUALITY-BAR 四项）

| 评点 | 分 | 说明 |
|---|---|---|
| 突出主题 | **8** | 冷白底 + Fraunces 超大主张 + 浅青绿 CTA；去掉 nav 仍可读「独立初级诊疗诊所」 |
| 每块有用 | **8** | Hero → Services → Doctors → Process → Reviews → Insurance/FAQ → Appointment → Visit → Footer；无假奖项墙/无关统计；合规免责声明在页脚 |
| 整洁对齐 | **8** | 直角卡、四格服务等高、四步流程、团队 2×2；桌面页高约 **7013px**（略高，可再压） |
| 一点新意 | **8** | 缓漂青绿云雾底 + 加粗变强调色 + 预约表（非订位表）+ 手风琴 FAQ；签名点=冷静医疗摄影 + 大字主张 |

**整站综合：8**

对照餐厅榜样：学到冷底/大字/直角卡/CMS 图管线（本版本地镜像）/柔和动效；未抄菜单/暖食滤镜/订位字段。

---

## 已完成（P0）

- [x] 英文-only（`lang=en`，无语言切换）
- [x] `PRODUCT.md` + `design/themes/northvale.json` + 云雾 globals + `prefers-reduced-motion`
- [x] Unsplash HD → CREDITS → `public/prismic-mirror/northvale_*.jpg`
- [x] 行业增量：`AppointmentForm`（+ ProcessSteps / CaseResults 模型保留）；本地 `lib/seed.js` 组装
- [x] 本地 build ✓ · Vercel `slice-clinic-app`（个人账号 `codys-projects-39cd6bc0`）
- [x] 截图 `preview/clinic_*_en.png`

---

## 图片管线

- 来源：Unsplash License（见 `provision/UNSPLASH-CREDITS-clinic.md`）
- **Prismic 仓库待建**：无 `slice-clinic` 写权限；首页走本地镜像字段形（`url` + Image shape），`prismicSrc` 为空直至 Asset 上传
- 显示：`/prismic-mirror/northvale_*.jpg`

---

## 截图

| 文件 | 用途 |
|---|---|
| `preview/clinic_desktop_en.png` | 桌面全页 |
| `preview/clinic_mobile_en.png` | 移动全页 |
| `preview/clinic_hero_en.png` | Hero |
| `preview/clinic_services_en.png` | 服务 4 格 |
| `preview/clinic_team_en.png` | 医生团队 |
| `preview/clinic_process_en.png` | 就诊流程 |
| `preview/clinic_appoint_en.png` | 预约表单 |
| `preview/clinic_faq_en.png` | 保险/FAQ |

---

## 上线证据

| 项 | 结果 |
|---|---|
| Vercel 项目 | `codys-projects-39cd6bc0/slice-clinic-app`（个人账号，无 team scope） |
| 生产别名 | https://slice-clinic-app.vercel.app |
| 部署状态 | Ready（CLI inspect） |
| 生产 HTML | warp 下 HTTP **200**；命中 `Northvale Clinic` ×9 · `Book an appointment` · medical advice 免责声明 |
| GitHub | https://github.com/Amazong110/slice-clinic · commit `5dc2853` · author Amazong110 |
| 本地 build | `next build` ✓ |
| 生产部署 | `dpl_EcmQ7CZJrsZf9gXsGccPLADh3R4m` · alias `https://slice-clinic-app.vercel.app` READY |

---

## 剩余 / 已知限制

1. **Prismic 仓库待建**：需主人建 `slice-clinic` 并发 Write/Custom Types token 后，再跑 Asset 上传 + 文档发布。  
2. **中文**：本轮明确只做英文。  
3. **页高**：桌面 ~7013px，可再收紧 section padding。  
4. **本机直连 Vercel edge**：部分出口超时；验收用 warp on → curl → warp off。  
5. **创建仓 token**：`github-token.txt`（fine-grained）无 `createRepository`；用餐厅仓同款 classic PAT 建仓并 push。

---

## 最弱一处（若继续打磨）

团队肖像题材偏「棚拍医护」——可信够用，但色温还可再统一冷调；Prismic CDN 接通后可去掉纯本地镜像路径。
