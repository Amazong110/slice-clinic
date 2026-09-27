module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./slices/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // 替换全局字体族为 Inter
    fontFamily: {
      sans: ['Montserrat'],
      heading: ['LibreBaskerville'],
      Montserrat: ['Montserrat'],
      verdana: ['Montserrat'], // 原 verdana 字体也替换
      LibreBaskerville: ['LibreBaskerville'],
    },
    extend: {
      // 新增自定义字号（30px/28px/20px）
      fontSize: {
        '36': '36px',
        '28': '28px',
        '20': '20px',
        '200': '200px',
      },
      maxWidth: {
        'nav': '15rem',
      },
      spacing: {
        '30': '100px', // 明确指定 20 单位等于 80px
      },
      colors: {
        'grey-e': '#eeeeee',
        'grey-c': '#cccccc',
        'grey-9': '#999999',
        'grey-6': '#666666',
        'grey-4': '#444444',
        // 主要背景色
        'white': '#ffffff',
        'black': '#000000',
        'red': 'var(--brand-cta)',
        // CTA button 背景色
        'orange': 'var(--brand-accent)',
        // 深背景色
        'green': 'var(--brand-heading)',
        'blue': '#91dbf0',
        'gold': 'var(--brand-accent)',
        'yellow': 'var(--brand-gold)',
        // 浅色背景字体颜色
        'grey': 'var(--brand-body)',
        'action': '#F20519',
        'dark': '#66714D',
        'nav': '#66714D'
      },
        // 新增全局基础样式（针对普通 h1 标签）
        base: {
          h1: {
            fontWeight: 'bold', // 自动加粗
            fontFamily: 'LibreBaskerville',
          },
          // 新增/扩展 h1-h6 的基础样式 - 浅色背景标题颜色：Deep green
          h1: {
            fontWeight: '700', // 自定义字重
            fontSize: '32px',   // 自定义字号（对应你配置的 40px）
            color: 'var(--brand-heading)',   // 浅色背景的标题颜色：Deep green
            fontFamily: 'LibreBaskerville',
          },
          h2: {
            fontWeight: 'bold',
            fontSize: '20px',   // 对应你配置的 32px
            color: 'var(--brand-heading)',   // 浅色背景的标题颜色：Deep green
            fontFamily: 'LibreBaskerville',
          },
          h3: {
            fontWeight: 'bold',
            fontSize: '20px',   // 对应你配置的 24px
            color: 'var(--brand-heading)',   // 浅色背景的标题颜色：Deep green
            fontFamily: 'LibreBaskerville',
          },
          h4: {
            fontWeight: 'bold',
            fontSize: '20px',   // 自定义其他字号（可根据需求调整）
            color: 'var(--brand-heading)',   // 浅色背景的标题颜色：Deep green
            fontFamily: 'LibreBaskerville',
          },
          h5: {
            fontWeight: 'bold',
            fontSize: '20px',
            color: 'var(--brand-heading)',   // 浅色背景的标题颜色：Deep green
            fontFamily: 'LibreBaskerville',
          },
          h6: {
            fontWeight: 'bold',
            fontSize: '20px',
            color: 'var(--brand-heading)',   // 浅色背景的标题颜色：Deep green
            fontFamily: 'LibreBaskerville',
          },
        },
      height: {
        '144': '36rem',
        '192': '48rem',
      },
      typography: {
        DEFAULT: {
          css: {
            // 标题使用 LibreBaskerville
            h1: {
              fontFamily: 'LibreBaskerville',
              marginTop: '36px',
              marginBottom: '24px',
              fontSize: '36px',
           
            },
            h2: {
              fontFamily: 'LibreBaskerville',
              marginTop: '36px',
              marginBottom: '24px',
              fontSize: '28px',
  
            },
            h3: {
              fontFamily: 'LibreBaskerville',
              marginTop: '36px',
              marginBottom: '20px',
            },
            h4: {
              fontFamily: 'LibreBaskerville',
            },
            h5: {
              fontFamily: 'LibreBaskerville',
            },
            h6: {
              fontFamily: 'LibreBaskerville',
            },
            // 正文和列表使用 Montserrat
            li: {
              fontFamily: 'Montserrat',
            },
            p: {
              fontFamily: 'Montserrat',
              marginTop: '36px',
              marginBottom: '24px',
              fontSize: '20px',
         
            },
            strong: {
              fontFamily: 'Montserrat',
              // fontSize: '20px',
       
            },
            // CTA 和链接使用 Montserrat - 链接的颜色：Orange
            a: {
              fontFamily: 'Montserrat',
              fontWeight: 'normal',
              color: 'var(--brand-accent)',   // 链接的颜色：Orange
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            },
            img: {
              margin: '48px auto',
            }
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}