const path = require('path');

module.exports = {
  title: 'Apus Charts Component Library',
  components: 'src/lib/**/[A-Z]*.tsx',
  ignore: [
    '**/__tests__/**', 
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
    'src/lib/**/types.ts',
    'src/lib/**/index.ts',
    'src/lib/hooks/**',
    'src/lib/utils/**',
    'src/lib/**/StackedBarChartRenderer.tsx',
  ],
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json', 
    {
      propFilter: (prop) => {
        if (prop.parent && prop.parent.fileName.includes('node_modules/@types/react/index.d.ts')) {
          return false;
        }
        return true;
      },
      shouldExtractLiteralValuesFromEnum: true,
      savePropValueAsString: true,
    }
  ).parse,
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md',
    },
    {
      name: 'Chart Components',
      components: [
        'src/lib/BarChart/BarChart.tsx',
        'src/lib/LineChart/LineChart.tsx',
        'src/lib/StackedBarChart/StackedBarChart.tsx',
        'src/lib/RadarChart/RadarChart.tsx',
        'src/lib/DonutChart/DonutChart.tsx',
        'src/lib/NestedDonutChart/NestedDonutChart.tsx',
        'src/lib/GaugeDonutChart/GaugeDonutChart.tsx',
      ],
      description: 'Reusable chart components for data visualization.',
      exampleMode: 'expand',
      usageMode: 'expand',
      sections: [
        {
          name: 'Donut Charts',
          components: [
            'src/lib/DonutChart/DonutChart.tsx',
            'src/lib/NestedDonutChart/NestedDonutChart.tsx',
            'src/lib/GaugeDonutChart/GaugeDonutChart.tsx',
          ],
          exampleMode: 'expand',
          usageMode: 'expand',
          exampleFiles: ['src/demo/components/DonutChartExamples.tsx'],
        },
      ],
    },
  ],
  verbose: true,
  serverPort: 6064,
  theme: {
    color: {
      base: '#333333', // Dark grey for base text
      light: '#767676', // Lighter grey for secondary text
      lightest: '#ccc', // Even lighter for borders, etc.
      link: '#007bff', // Bootstrap blue for links
      linkHover: '#0056b3',
      border: '#e8e8e8',
      name: '#c53993', // Color for component names (a pinkish hue)
      type: '#a67f59', // Color for prop types (a brownish hue)
      error: '#fff', // Error text color (often on dark background)
      baseBackground: '#ffffff', // Main background - white
      codeBackground: '#f5f5f5', // Light grey for code blocks
      sidebarBackground: '#343a40', // Darker sidebar (Bootstrap dark-like)
      ribbonBackground: '#007bff',
      ribbonText: '#fff',
      // For active link in sidebar
      activeListItemText: '#ffffff',
      activeListItemBackground: '#007bff',
    },
    fontFamily: {
      base: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      monospace: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace' // Monospace for code
    },
    fontSize: {
      base: 15,
      text: 16,
      small: 13,
      h1: 36,
      h2: 28,
      h3: 22,
      h4: 18,
      h5: 16,
      h6: 16,
    }
  },
  styles: {
    Logo: {
      // Style for the logo if you use a custom component or if title styling is needed
      logo: {
        color: '#333',
        fontSize: '24px'
      }
    }
  },
  styleguideComponents: {
    LogoRenderer: path.join(__dirname, 'docs/styleguide-components/LogoRenderer.tsx'),
  },
  dangerouslyUpdateWebpackConfig: (webpackConfig, env) => {
    // Output configuration
    webpackConfig.output = webpackConfig.output || {};
    if (env === 'production') {
      webpackConfig.output.publicPath = '/apus/';
    }

    // Resolve alias configuration
    webpackConfig.resolve = webpackConfig.resolve || {};
    webpackConfig.resolve.alias = webpackConfig.resolve.alias || {};
    webpackConfig.resolve.alias.apus = path.resolve(__dirname, 'src/lib/index.ts');

    // Module rules configuration
    webpackConfig.module = webpackConfig.module || {}; // Ensure module object exists
    
    // Ensure rules array exists, preserving existing rules
    const existingRules = Array.isArray(webpackConfig.module.rules) ? webpackConfig.module.rules : [];
    // IMPORTANT: We are directly mutating webpackConfig.module.rules here as per how dangerouslyUpdateWebpackConfig often works.
    // If Styleguidist passes a frozen object, this might need adjustment, but typically it's mutable.
    webpackConfig.module.rules = [...existingRules]; 
    console.log('[dangerouslyUpdateWebpackConfig] Before prepending, webpackConfig.module.rules length:', webpackConfig.module.rules.length);
    if (webpackConfig.module.rules.length > 0) {
      console.log('[dangerouslyUpdateWebpackConfig] Existing rules:', JSON.stringify(webpackConfig.module.rules, null, 2));
    }

    const babelLoaderRule = {
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript'
          ]
        }
      }]
    };
    const cssLoaderRule = {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    };

    // Prepend our rules
    webpackConfig.module.rules.unshift(babelLoaderRule, cssLoaderRule);

    console.log('[dangerouslyUpdateWebpackConfig] After prepending, webpackConfig.module.rules length:', webpackConfig.module.rules.length);
    console.log('[dangerouslyUpdateWebpackConfig] Final webpackConfig.module.rules:', JSON.stringify(webpackConfig.module.rules, null, 2));
    
    return webpackConfig;
  }
};
