import React, { memo } from 'react'
import ReactEcharts from 'echarts-for-react'
import { EvolutionWrapper } from './style'
const Evolution = () => {
  const MonthClassData = {
    nodes: [
      {
        name: 'Total'
      },
      {
        name: '9月'
      },
      {
        name: '10月'
      },
      {
        name: '11月'
      },
      {
        name: '12月'
      },
      {
        name: '1月'
      },
      {
        name: '工作日(9月)'
      },
      {
        name: '休息日(9月)'
      },

      {
        name: '工作日(10月)'
      },
      {
        name: '休息日(10月)'
      },
      {
        name: '工作日(11月)'
      },
      {
        name: '休息日(11月)'
      },
      {
        name: '工作日(12月)'
      },
      {
        name: '休息日(12月)'
      },
      {
        name: '工作日(1月)'
      },
      {
        name: '休息日(1月)'
      },
      {
        name: '凌晨(9月)'
      },
      {
        name: '上午(9月)'
      },
      {
        name: '下午(9月)'
      },
      {
        name: '晚上(9月)'
      },
      {
        name: '凌晨(10月)'
      },
      {
        name: '上午(10月)'
      },
      {
        name: '下午(10月)'
      },
      {
        name: '晚上(10月)'
      },
      {
        name: '凌晨(11月)'
      },
      {
        name: '上午(11月)'
      },
      {
        name: '下午(11月)'
      },
      {
        name: '晚上(11月)'
      },
      {
        name: '凌晨(12月)'
      },
      {
        name: '上午(12月)'
      },
      {
        name: '下午(12月)'
      },
      {
        name: '晚上(12月)'
      },
      {
        name: '凌晨(1月)'
      },
      {
        name: '上午(1月)'
      },
      {
        name: '下午(1月)'
      },
      {
        name: '晚上(1月)'
      },
      {
        name: '高峰型'
      },
      {
        name: '平均型'
      },
      {
        name: '低峰型'
      }
    ],
    links: [
      {
        source: 'Total',
        target: '9月',
        value: 0.342284047256003
      },
      {
        source: 'Total',
        target: '10月',
        value: 0.342284047256003
      },
      {
        source: 'Total',
        target: '11月',
        value: 0.342284047256003
      },
      {
        source: 'Total',
        target: '12月',
        value: 0.342284047256003
      },
      {
        source: 'Total',
        target: '1月',
        value: 0.342284047256003
      },
      {
        source: '9月',
        target: '工作日(9月)',
        value: 0.342284047256003
      },
      {
        source: '9月',
        target: '休息日(9月)',
        value: 0.342284047256003
      },
      {
        source: '10月',
        target: '工作日(10月)',
        value: 0.342284047256003
      },
      {
        source: '10月',
        target: '休息日(10月)',
        value: 0.342284047256003
      },
      {
        source: '11月',
        target: '工作日(11月)',
        value: 0.342284047256003
      },
      {
        source: '11月',
        target: '休息日(11月)',
        value: 0.342284047256003
      },
      {
        source: '12月',
        target: '工作日(12月)',
        value: 0.342284047256003
      },
      {
        source: '12月',
        target: '休息日(12月)',
        value: 0.342284047256003
      },
      {
        source: '1月',
        target: '工作日(1月)',
        value: 0.342284047256003
      },
      {
        source: '1月',
        target: '休息日(1月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(9月)',
        target: '凌晨(9月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(9月)',
        target: '凌晨(9月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(9月)',
        target: '上午(9月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(9月)',
        target: '上午(9月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(9月)',
        target: '下午(9月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(9月)',
        target: '下午(9月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(9月)',
        target: '晚上(9月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(9月)',
        target: '晚上(9月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(10月)',
        target: '凌晨(10月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(10月)',
        target: '凌晨(10月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(10月)',
        target: '上午(10月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(10月)',
        target: '上午(10月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(10月)',
        target: '下午(10月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(10月)',
        target: '下午(10月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(10月)',
        target: '晚上(10月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(10月)',
        target: '晚上(10月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(11月)',
        target: '凌晨(11月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(11月)',
        target: '凌晨(11月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(11月)',
        target: '上午(11月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(11月)',
        target: '上午(11月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(11月)',
        target: '下午(11月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(11月)',
        target: '下午(11月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(11月)',
        target: '晚上(11月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(11月)',
        target: '晚上(11月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(12月)',
        target: '凌晨(12月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(12月)',
        target: '凌晨(12月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(12月)',
        target: '上午(12月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(12月)',
        target: '上午(12月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(12月)',
        target: '下午(12月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(12月)',
        target: '下午(12月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(12月)',
        target: '晚上(12月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(12月)',
        target: '晚上(12月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(1月)',
        target: '凌晨(1月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(1月)',
        target: '凌晨(1月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(1月)',
        target: '上午(1月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(1月)',
        target: '上午(1月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(1月)',
        target: '下午(1月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(1月)',
        target: '下午(1月)',
        value: 0.342284047256003
      },
      {
        source: '工作日(1月)',
        target: '晚上(1月)',
        value: 0.342284047256003
      },
      {
        source: '休息日(1月)',
        target: '晚上(1月)',
        value: 0.342284047256003
      },
      {
        source: '凌晨(9月)',
        target: '平均型',
        value: 0.342284047256003
      },
      {
        source: '上午(9月)',
        target: '平均型',
        value: 0.342284047256003
      },
      {
        source: '下午(9月)',
        target: '平均型',
        value: 0.342284047256003
      },
      {
        source: '晚上(9月)',
        target: '低峰型',
        value: 0.342284047256003
      },
      {
        source: '凌晨(10月)',
        target: '平均型',
        value: 0.342284047256003
      },
      {
        source: '上午(10月)',
        target: '高峰型',
        value: 0.342284047256003
      },
      {
        source: '下午(10月)',
        target: '高峰型',
        value: 0.342284047256003
      },
      {
        source: '晚上(10月)',
        target: '低峰型',
        value: 0.342284047256003
      },
      {
        source: '凌晨(11月)',
        target: '平均型',
        value: 0.342284047256003
      },
      {
        source: '上午(11月)',
        target: '高峰型',
        value: 0.342284047256003
      },
      {
        source: '下午(11月)',
        target: '高峰型',
        value: 0.342284047256003
      },
      {
        source: '晚上(11月)',
        target: '高峰型',
        value: 0.342284047256003
      },
      {
        source: '凌晨(12月)',
        target: '平均型',
        value: 0.342284047256003
      },
      {
        source: '上午(12月)',
        target: '平均型',
        value: 0.342284047256003
      },
      {
        source: '下午(12月)',
        target: '平均型',
        value: 0.342284047256003
      },
      {
        source: '晚上(12月)',
        target: '低峰型',
        value: 0.342284047256003
      },
      {
        source: '凌晨(1月)',
        target: '低峰型',
        value: 0.342284047256003
      },
      {
        source: '上午(1月)',
        target: '低峰型',
        value: 0.342284047256003
      },
      {
        source: '下午(1月)',
        target: '低峰型',
        value: 0.342284047256003
      },
      {
        source: '晚上(1月)',
        target: '低峰型',
        value: 0.342284047256003
      }
    ]
  }
  // const data = {
  //   nodes: [
  //     {
  //       name: 'Total'
  //     },
  //     {
  //       name: 'Environment'
  //     },
  //     {
  //       name: 'Land use'
  //     },
  //     {
  //       name: 'Cocoa butter (Organic)'
  //     },
  //     {
  //       name: 'Cocoa mass (Organic)'
  //     },
  //     {
  //       name: 'Hazelnuts (Organic)'
  //     },
  //     {
  //       name: 'Cane sugar (Organic)'
  //     },
  //     {
  //       name: 'Vegetables (Organic)'
  //     },
  //     {
  //       name: 'Climate change'
  //     },
  //     {
  //       name: 'Harmful substances'
  //     },
  //     {
  //       name: 'Water use'
  //     },
  //     {
  //       name: 'Resource depletion'
  //     },
  //     {
  //       name: 'Refrigeration'
  //     },
  //     {
  //       name: 'Packaging'
  //     },
  //     {
  //       name: 'Human rights'
  //     },
  //     {
  //       name: 'Child labour'
  //     },
  //     {
  //       name: 'Coconut oil (Organic)'
  //     },
  //     {
  //       name: 'Forced labour'
  //     },
  //     {
  //       name: 'Health safety'
  //     },
  //     {
  //       name: 'Access to water'
  //     },
  //     {
  //       name: 'Freedom of association'
  //     },
  //     {
  //       name: 'Access to land'
  //     },
  //     {
  //       name: 'Sufficient wage'
  //     },
  //     {
  //       name: 'Equal rights migrants'
  //     },
  //     {
  //       name: 'Discrimination'
  //     },
  //     {
  //       name: 'Working hours'
  //     }
  //   ],
  //   links: [
  //     {
  //       source: 'Total',
  //       target: 'Environment',
  //       value: 0.342284047256003
  //     },
  //     {
  //       source: 'Environment',
  //       target: 'Land use',
  //       value: 0.32322870366987
  //     },
  //     {
  //       source: 'Land use',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0.177682517071359
  //     },
  //     {
  //       source: 'Land use',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0.137241325342711
  //     },
  //     {
  //       source: 'Land use',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0.00433076373512774
  //     },
  //     {
  //       source: 'Land use',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.00296956039863467
  //     },
  //     {
  //       source: 'Land use',
  //       target: 'Vegetables (Organic)',
  //       value: 0.00100453712203756
  //     },
  //     {
  //       source: 'Environment',
  //       target: 'Climate change',
  //       value: 0.0112886157414413
  //     },
  //     {
  //       source: 'Climate change',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0.00676852971933996
  //     },
  //     {
  //       source: 'Climate change',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0.00394686874786743
  //     },
  //     {
  //       source: 'Climate change',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.000315972058711838
  //     },
  //     {
  //       source: 'Climate change',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0.000218969462265292
  //     },
  //     {
  //       source: 'Climate change',
  //       target: 'Vegetables (Organic)',
  //       value: 0.0000382757532567656
  //     },
  //     {
  //       source: 'Environment',
  //       target: 'Harmful substances',
  //       value: 0.00604275542495656
  //     },
  //     {
  //       source: 'Harmful substances',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0.0055125989240741
  //     },
  //     {
  //       source: 'Harmful substances',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0.000330017607892127
  //     },
  //     {
  //       source: 'Harmful substances',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.000200138892990337
  //     },
  //     {
  //       source: 'Harmful substances',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0
  //     },
  //     {
  //       source: 'Harmful substances',
  //       target: 'Vegetables (Organic)',
  //       value: 0
  //     },
  //     {
  //       source: 'Environment',
  //       target: 'Water use',
  //       value: 0.00148345269044703
  //     },
  //     {
  //       source: 'Water use',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0.00135309891304186
  //     },
  //     {
  //       source: 'Water use',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0.000105714137908639
  //     },
  //     {
  //       source: 'Water use',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0.0000133452642581887
  //     },
  //     {
  //       source: 'Water use',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.00000878074837009238
  //     },
  //     {
  //       source: 'Water use',
  //       target: 'Vegetables (Organic)',
  //       value: 0.0000025136268682477
  //     },
  //     {
  //       source: 'Environment',
  //       target: 'Resource depletion',
  //       value: 0.000240519729288764
  //     },
  //     {
  //       source: 'Resource depletion',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.000226237279345084
  //     },
  //     {
  //       source: 'Resource depletion',
  //       target: 'Vegetables (Organic)',
  //       value: 0.0000142824499436793
  //     },
  //     {
  //       source: 'Resource depletion',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0
  //     },
  //     {
  //       source: 'Resource depletion',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0
  //     },
  //     {
  //       source: 'Resource depletion',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0
  //     },
  //     {
  //       source: 'Environment',
  //       target: 'Refrigeration',
  //       value: 0
  //     },
  //     {
  //       source: 'Environment',
  //       target: 'Packaging',
  //       value: 0
  //     },
  //     {
  //       source: 'Total',
  //       target: 'Human rights',
  //       value: 0.307574096993239
  //     },
  //     {
  //       source: 'Human rights',
  //       target: 'Child labour',
  //       value: 0.0410641202645833
  //     },
  //     {
  //       source: 'Child labour',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0.0105339381639722
  //     },
  //     {
  //       source: 'Child labour',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0.0105
  //     },
  //     {
  //       source: 'Child labour',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0.0087294420777
  //     },
  //     {
  //       source: 'Child labour',
  //       target: 'Coconut oil (Organic)',
  //       value: 0.00474399974233333
  //     },
  //     {
  //       source: 'Child labour',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.00388226450884445
  //     },
  //     {
  //       source: 'Child labour',
  //       target: 'Vegetables (Organic)',
  //       value: 0.00267447577173333
  //     },
  //     {
  //       source: 'Human rights',
  //       target: 'Forced labour',
  //       value: 0.0365458590642445
  //     },
  //     {
  //       source: 'Forced labour',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0.0114913076376389
  //     },
  //     {
  //       source: 'Forced labour',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0.0081134807347
  //     },
  //     {
  //       source: 'Forced labour',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0.00765230236575
  //     },
  //     {
  //       source: 'Forced labour',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.004
  //     },
  //     {
  //       source: 'Forced labour',
  //       target: 'Vegetables (Organic)',
  //       value: 0.00296668823626667
  //     },
  //     {
  //       source: 'Forced labour',
  //       target: 'Coconut oil (Organic)',
  //       value: 0.00232208008988889
  //     },
  //     {
  //       source: 'Human rights',
  //       target: 'Health safety',
  //       value: 0.0345435327843611
  //     },
  //     {
  //       source: 'Health safety',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0.0121419536385
  //     },
  //     {
  //       source: 'Health safety',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0.00766772850678333
  //     },
  //     {
  //       source: 'Health safety',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0.0056245892061
  //     },
  //     {
  //       source: 'Health safety',
  //       target: 'Coconut oil (Organic)',
  //       value: 0.00361616847688889
  //     },
  //     {
  //       source: 'Health safety',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.00277374682533333
  //     },
  //     {
  //       source: 'Health safety',
  //       target: 'Vegetables (Organic)',
  //       value: 0.00271934613075556
  //     },
  //     {
  //       source: 'Human rights',
  //       target: 'Access to water',
  //       value: 0.0340206659360667
  //     },
  //     {
  //       source: 'Access to water',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0.0105
  //     },
  //     {
  //       source: 'Access to water',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0.0089274160792
  //     },
  //     {
  //       source: 'Access to water',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0.0054148022845
  //     },
  //     {
  //       source: 'Access to water',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.00333938149786667
  //     },
  //     {
  //       source: 'Access to water',
  //       target: 'Vegetables (Organic)',
  //       value: 0.00314663377488889
  //     },
  //     {
  //       source: 'Access to water',
  //       target: 'Coconut oil (Organic)',
  //       value: 0.00269243229961111
  //     },
  //     {
  //       source: 'Human rights',
  //       target: 'Freedom of association',
  //       value: 0.0320571523941667
  //     },
  //     {
  //       source: 'Freedom of association',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0.0132312483463611
  //     },
  //     {
  //       source: 'Freedom of association',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0.0077695200707
  //     },
  //     {
  //       source: 'Freedom of association',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0.00510606573995
  //     },
  //     {
  //       source: 'Freedom of association',
  //       target: 'Vegetables (Organic)',
  //       value: 0.00354321156324444
  //     },
  //     {
  //       source: 'Freedom of association',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.00240710667391111
  //     },
  //     {
  //       source: 'Freedom of association',
  //       target: 'Coconut oil (Organic)',
  //       value: 0
  //     },
  //     {
  //       source: 'Human rights',
  //       target: 'Access to land',
  //       value: 0.0315022209894056
  //     },
  //     {
  //       source: 'Access to land',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0.00964970063322223
  //     },
  //     {
  //       source: 'Access to land',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0.00938530207965
  //     },
  //     {
  //       source: 'Access to land',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0.0060110791848
  //     },
  //     {
  //       source: 'Access to land',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.00380818314608889
  //     },
  //     {
  //       source: 'Access to land',
  //       target: 'Vegetables (Organic)',
  //       value: 0.00264795594564445
  //     },
  //     {
  //       source: 'Access to land',
  //       target: 'Coconut oil (Organic)',
  //       value: 0
  //     },
  //     {
  //       source: 'Human rights',
  //       target: 'Sufficient wage',
  //       value: 0.0287776757227333
  //     },
  //     {
  //       source: 'Sufficient wage',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0.00883512456493333
  //     },
  //     {
  //       source: 'Sufficient wage',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0.0078343367268
  //     },
  //     {
  //       source: 'Sufficient wage',
  //       target: 'Coconut oil (Organic)',
  //       value: 0.00347879026511111
  //     },
  //     {
  //       source: 'Sufficient wage',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0.00316254211388889
  //     },
  //     {
  //       source: 'Sufficient wage',
  //       target: 'Vegetables (Organic)',
  //       value: 0.00281013722808889
  //     },
  //     {
  //       source: 'Sufficient wage',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.00265674482391111
  //     },
  //     {
  //       source: 'Human rights',
  //       target: 'Equal rights migrants',
  //       value: 0.0271146645119444
  //     },
  //     {
  //       source: 'Equal rights migrants',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0.0071042315061
  //     },
  //     {
  //       source: 'Equal rights migrants',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0.00636673210005
  //     },
  //     {
  //       source: 'Equal rights migrants',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0.00601459775836111
  //     },
  //     {
  //       source: 'Equal rights migrants',
  //       target: 'Coconut oil (Organic)',
  //       value: 0.00429185583138889
  //     },
  //     {
  //       source: 'Equal rights migrants',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.00182647471915556
  //     },
  //     {
  //       source: 'Equal rights migrants',
  //       target: 'Vegetables (Organic)',
  //       value: 0.00151077259688889
  //     },
  //     {
  //       source: 'Human rights',
  //       target: 'Discrimination',
  //       value: 0.0211217763359833
  //     },
  //     {
  //       source: 'Discrimination',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0.00609671700306667
  //     },
  //     {
  //       source: 'Discrimination',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0.0047738806325
  //     },
  //     {
  //       source: 'Discrimination',
  //       target: 'Coconut oil (Organic)',
  //       value: 0.00368119084494444
  //     },
  //     {
  //       source: 'Discrimination',
  //       target: 'Vegetables (Organic)',
  //       value: 0.00286009813604444
  //     },
  //     {
  //       source: 'Discrimination',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.00283706180951111
  //     },
  //     {
  //       source: 'Discrimination',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0.000872827909916666
  //     },
  //     {
  //       source: 'Human rights',
  //       target: 'Working hours',
  //       value: 0.02082642898975
  //     },
  //     {
  //       source: 'Working hours',
  //       target: 'Hazelnuts (Organic)',
  //       value: 0.0107216773848333
  //     },
  //     {
  //       source: 'Working hours',
  //       target: 'Coconut oil (Organic)',
  //       value: 0.00359009052944444
  //     },
  //     {
  //       source: 'Working hours',
  //       target: 'Vegetables (Organic)',
  //       value: 0.00212300379075556
  //     },
  //     {
  //       source: 'Working hours',
  //       target: 'Cocoa butter (Organic)',
  //       value: 0.0018518584356
  //     },
  //     {
  //       source: 'Working hours',
  //       target: 'Cocoa mass (Organic)',
  //       value: 0.00158227069058333
  //     },
  //     {
  //       source: 'Working hours',
  //       target: 'Cane sugar (Organic)',
  //       value: 0.000957528158533333
  //     }
  //   ]
  // }
  const option = {
    title: {
      text: 'Sankey Diagram'
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: '5%'
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },

    series: [
      {
        type: 'sankey',
        data: MonthClassData.nodes,
        links: MonthClassData.links,
        emphasis: {
          focus: 'adjacency'
        },
        levels: [
          {
            depth: 0,
            itemStyle: {
              color: '#fbb4ae'
            },
            lineStyle: {
              color: 'source',
              opacity: 0.6
            }
          },
          {
            depth: 1,
            itemStyle: {
              color: '#b3cde3'
            },
            lineStyle: {
              color: 'source',
              opacity: 0.6
            }
          },
          {
            depth: 2,
            itemStyle: {
              color: '#ccebc5'
            },
            lineStyle: {
              color: 'source',
              opacity: 0.6
            }
          },
          {
            depth: 3,
            itemStyle: {
              color: '#decbe4'
            },
            lineStyle: {
              color: 'source',
              opacity: 0.6
            }
          }
        ],
        lineStyle: {
          curveness: 0.5
        }
      }
    ]
  }
  //凹凸图数据准备
  const names = ['9月', '10月', '11月', '12月', '1月']
  // const lables = ['高峰型', '平均型', '低峰型']
  const years = ['凌晨', '上午', '下午', '晚上']
  // const shuffle = (array) => {
  //   let currentIndex = array.length
  //   let randomIndex = 0
  //   while (currentIndex > 0) {
  //     randomIndex = Math.floor(Math.random() * currentIndex)
  //     currentIndex--
  //     ;[array[currentIndex], array[randomIndex]] = [
  //       array[randomIndex],
  //       array[currentIndex]
  //     ]
  //   }
  //   return array
  // }
  const generateRankingData = () => {
    const map = new Map()
    const defaultRanking = [
      ['平均型', '平均型', '平均型', '低峰型'],
      ['平均型', '高峰型', '高峰型', '低峰型'],
      ['平均型', '高峰型', '高峰型', '低峰型'],
      ['平均型', '平均型', '平均型', '低峰型'],
      ['平均型', '平均型', '平均型', '低峰型']
    ]
    names.forEach((name, i) => {
      map.set(name, (map.get(name) || []).concat(defaultRanking[i]))
    })
    return map
  }

  const generateSeriesList = () => {
    const seriesList = []
    const rankingMap = generateRankingData()
    rankingMap.forEach((data, name) => {
      const series = {
        name,
        symbolSize: 8,
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        endLabel: {
          show: true,
          formatter: '{a}',
          distance: 20
        },
        lineStyle: {
          width: 3
        },
        data
      }
      seriesList.push(series)
    })
    return seriesList
  }
  console.log(generateSeriesList())

  //9的演变
  const option9 = {
    tooltip: {
      trigger: 'item'
    },
    grid: {
      left: 60,
      right: 50,
      bottom: 20,
      top: 10
    },
    xAxis: {
      type: 'category',
      splitLine: {
        show: true
      },
      axisLabel: {
        margin: 5,
        fontSize: 12
      },
      boundaryGap: false,
      data: years
    },
    yAxis: {
      splitLine: {
        show: true
      },
      axisLabel: {
        margin: 20,
        fontSize: 12
      },
      boundaryGap: false,
      inverse: true,
      data: ['高峰型', '平均型', '低峰型']
    },
    series: generateSeriesList()[0]
  }
  //10的演变
  const option10 = {
    tooltip: {
      trigger: 'item'
    },
    grid: {
      left: 60,
      right: 50,
      bottom: 20,
      top: 10
    },
    xAxis: {
      type: 'category',
      splitLine: {
        show: true
      },
      axisLabel: {
        margin: 5,
        fontSize: 12
      },
      boundaryGap: false,
      data: years
    },
    yAxis: {
      splitLine: {
        show: true
      },
      axisLabel: {
        margin: 20,
        fontSize: 12
      },
      boundaryGap: false,
      inverse: true,
      data: ['高峰型', '平均型', '低峰型']
    },
    series: generateSeriesList()[1]
  }

  //11的演变
  const option11 = {
    tooltip: {
      trigger: 'item'
    },
    grid: {
      left: 60,
      right: 50,
      bottom: 20,
      top: 10
    },
    xAxis: {
      type: 'category',
      splitLine: {
        show: true
      },
      axisLabel: {
        margin: 5,
        fontSize: 12
      },
      boundaryGap: false,
      data: years
    },
    yAxis: {
      splitLine: {
        show: true
      },
      axisLabel: {
        margin: 20,
        fontSize: 12
      },
      boundaryGap: false,
      inverse: true,
      data: ['高峰型', '平均型', '低峰型']
    },
    series: generateSeriesList()[2]
  }

  //12的演变
  const option12 = {
    tooltip: {
      trigger: 'item'
    },
    grid: {
      left: 60,
      right: 50,
      bottom: 20,
      top: 10
    },
    xAxis: {
      type: 'category',
      splitLine: {
        show: true
      },
      axisLabel: {
        margin: 5,
        fontSize: 12
      },
      boundaryGap: false,
      data: years
    },
    yAxis: {
      splitLine: {
        show: true
      },
      axisLabel: {
        margin: 20,
        fontSize: 12
      },
      boundaryGap: false,
      inverse: true,
      data: ['高峰型', '平均型', '低峰型']
    },
    series: generateSeriesList()[3]
  }

  //1的演变
  const option1 = {
    tooltip: {
      trigger: 'item'
    },
    grid: {
      left: 60,
      right: 50,
      bottom: 20,
      top: 10
    },
    xAxis: {
      type: 'category',
      splitLine: {
        show: true
      },
      axisLabel: {
        margin: 5,
        fontSize: 12
      },
      boundaryGap: false,
      data: years
    },
    yAxis: {
      splitLine: {
        show: true
      },
      axisLabel: {
        margin: 20,
        fontSize: 12
      },
      boundaryGap: false,
      inverse: true,
      data: ['高峰型', '平均型', '低峰型']
    },
    series: generateSeriesList()[4]
  }

  return (
    <EvolutionWrapper>
      <div className="title">时间模式演化</div>
      <div className="content">
        <div className="leftview">
          <ReactEcharts
            option={option}
            style={{ width: '110%', height: '100%' }}
          />
        </div>
        <div className="rightview">
          <ReactEcharts
            option={option9}
            style={{ width: '100%', height: '20%' }}
          />
          <ReactEcharts
            option={option10}
            style={{ width: '100%', height: '20%' }}
          />
          <ReactEcharts
            option={option11}
            style={{ width: '100%', height: '20%' }}
          />
          <ReactEcharts
            option={option12}
            style={{ width: '100%', height: '20%' }}
          />
          <ReactEcharts
            option={option1}
            style={{ width: '100%', height: '20%' }}
          />

          {/* <div className="rightBottomview">
            {' '}
            <ReactEcharts
              option={optionnotwork}
              style={{ width: '100%', height: '100%' }}
            />
          </div> */}
        </div>
      </div>
    </EvolutionWrapper>
  )
}
export default memo(Evolution)
