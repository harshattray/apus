const path = require('path');

console.log('process.cwd():', process.cwd());
console.log('__dirname:', __dirname);

module.exports = {
  title: 'Apus Chart Component Library',
  components: '../apus-charts/src/**/*.{js,jsx,ts,tsx}',
  ignore: [
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
    '../apus-charts/src/**/types.ts',
    '../apus-charts/src/**/index.ts',
    '../apus-charts/src/hooks/**',
    '../apus-charts/src/utils/**',
    '../apus-charts/src/StackedBarChart/StackedBarChartRenderer.tsx',
  ],
  require: [
    path.resolve(__dirname, '../apus-charts/src/index.ts'),
  ],
  propsParser: require('react-docgen-typescript').withCustomConfig(
    path.resolve(__dirname, '../apus-charts/tsconfig.json'),
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
      content: path.resolve(__dirname, '../../docs/introduction.md'),
    },
    {
      name: 'Chart Components',
      components: [
        '../apus-charts/src/BarChart/BarChart.tsx',
        '../apus-charts/src/LineChart/LineChart.tsx',
        '../apus-charts/src/StackedBarChart/StackedBarChart.tsx',
        '../apus-charts/src/RadarChart/RadarChart.tsx',
      ],
      description: 'Reusable chart components for data visualization.',
      exampleMode: 'expand',
      usageMode: 'expand',
      sections: [
        {
          name: 'Donut Charts',
          components: [
            '../apus-charts/src/DonutChart/DonutChart.tsx',
            '../apus-charts/src/NestedDonutChart/NestedDonutChart.tsx',
            '../apus-charts/src/GaugeDonutChart/GaugeDonutChart.tsx',
            'src/components/DonutChartExamples.tsx',
          ],
          exampleMode: 'expand',
          usageMode: 'expand',
        },
      ],
    },
    {
      name: 'Funnel Charts',
      components: [
        '../apus-charts/src/FunnelChart/FunnelChart.tsx',
        '../apus-charts/src/FunnelChart/TimeSeriesFunnelChart.tsx',
        '../apus-charts/src/FunnelChart/SegmentedFunnelChart.tsx',
      ],
    },
  ],
  verbose: true,
  serverPort: 6066,
  theme: {
    color: {
      base: '#333333',
      light: '#767676',
      lightest: '#ccc',
      link: '#007bff',
      linkHover: '#0056b3',
      border: '#e8e8e8',
      name: '#c53993',
      type: '#a67f59',
      error: '#fff',
      baseBackground: '#ffffff',
      codeBackground: '#f5f5f5',
      sidebarBackground: '#343a40',
      ribbonBackground: '#007bff',
      ribbonText: '#fff',
      activeListItemText: '#ffffff',
      activeListItemBackground: '#007bff',
    },
    fontFamily: {
      base: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      monospace: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
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
    },
  },
  styles: {
    Logo: {
      logo: {
        color: '#333',
        fontSize: '24px',
      },
    },
  },
  styleguideDir: 'styleguide',
  styleguideComponents: {
    LogoRenderer: path.join(__dirname, 'docs/styleguide-components/LogoRenderer.tsx'),
  },
  webpackConfig: {
    // module.rules are now handled in dangerouslyUpdateWebpackConfig
    
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      // alias is now handled in dangerouslyUpdateWebpackConfig
    },
  },
  exampleMode: 'expand',
  usageMode: 'expand',
  skipComponentsWithoutExample: false,
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    const newRules = [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ];

    // Ensure webpackConfig.module and webpackConfig.module.rules exist
    if (!webpackConfig.module) {
      webpackConfig.module = {};
    }
    if (!webpackConfig.module.rules) {
      webpackConfig.module.rules = [];
    }
    // Prepend our rules
    webpackConfig.module.rules = [...newRules, ...webpackConfig.module.rules];

    // Ensure webpackConfig.resolve and webpackConfig.resolve.alias exist
    if (!webpackConfig.resolve) {
      webpackConfig.resolve = {};
    }
    if (!webpackConfig.resolve.alias) {
      webpackConfig.resolve.alias = {};
    }
    // Ensure aliases are correctly merged/set
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias, // Now this is safe
      apus: path.resolve(__dirname, '../apus-charts/src/index.ts'),
      'rsg-components/Logo/LogoRenderer': path.join(__dirname, 'docs/styleguide-components/LogoRenderer.tsx'),
    };

    return webpackConfig;
  },
};
