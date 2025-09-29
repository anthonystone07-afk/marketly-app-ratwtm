
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { commonStyles, colors } from "@/styles/commonStyles";

export default function AnalyticsScreen() {
  console.log("Analytics screen loaded");

  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => {
        console.log("Back pressed");
        router.back();
      }}
      style={styles.headerButton}
    >
      <IconSymbol name="chevron.left" color={colors.text} size={24} />
    </Pressable>
  );

  const periods = [
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'quarter', label: 'This Quarter' },
  ];

  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      {periods.map((period) => (
        <Pressable
          key={period.key}
          style={[
            styles.periodButton,
            selectedPeriod === period.key && styles.periodButtonActive
          ]}
          onPress={() => {
            console.log(`Period selected: ${period.key}`);
            setSelectedPeriod(period.key as any);
          }}
        >
          <Text style={[
            styles.periodButtonText,
            selectedPeriod === period.key && styles.periodButtonTextActive
          ]}>
            {period.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const getMetricsForPeriod = () => {
    switch (selectedPeriod) {
      case 'week':
        return {
          revenue: '$12,500',
          leads: '45',
          conversion: '8.2%',
          impressions: '125K',
          clicks: '3.2K',
          ctr: '2.56%',
          cpc: '$3.90',
          roas: '4.2x'
        };
      case 'month':
        return {
          revenue: '$48,700',
          leads: '186',
          conversion: '7.8%',
          impressions: '520K',
          clicks: '12.8K',
          ctr: '2.46%',
          cpc: '$3.80',
          roas: '4.5x'
        };
      case 'quarter':
        return {
          revenue: '$142,300',
          leads: '542',
          conversion: '8.1%',
          impressions: '1.5M',
          clicks: '38.2K',
          ctr: '2.55%',
          cpc: '$3.73',
          roas: '4.7x'
        };
      default:
        return {
          revenue: '$48,700',
          leads: '186',
          conversion: '7.8%',
          impressions: '520K',
          clicks: '12.8K',
          ctr: '2.46%',
          cpc: '$3.80',
          roas: '4.5x'
        };
    }
  };

  const metrics = getMetricsForPeriod();

  const topPerformingCampaigns = [
    { name: 'Holiday Social Media Boost', performance: '+24%', color: colors.success },
    { name: 'SEO Content Strategy', performance: '+18%', color: colors.success },
    { name: 'Email Newsletter Campaign', performance: '+12%', color: colors.success },
    { name: 'Google Ads - Local Services', performance: '-5%', color: colors.error },
  ];

  const channelPerformance = [
    { channel: 'Social Media', revenue: '$18,500', percentage: '38%', color: colors.primary },
    { channel: 'Search Engine', revenue: '$15,200', percentage: '31%', color: colors.secondary },
    { channel: 'Email Marketing', revenue: '$9,800', percentage: '20%', color: colors.accent },
    { channel: 'Direct Traffic', revenue: '$5,200', percentage: '11%', color: colors.warning },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Analytics",
          headerLeft: renderHeaderLeft,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
            fontWeight: '600',
          },
        }}
      />
      <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.content}>
          {/* Period Selector */}
          <View style={styles.selectorContainer}>
            {renderPeriodSelector()}
          </View>

          {/* Key Performance Metrics */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Key Performance</Text>
            <View style={commonStyles.card}>
              <View style={commonStyles.row}>
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.success }]}>{metrics.revenue}</Text>
                  <Text style={commonStyles.metricLabel}>Revenue</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.primary }]}>{metrics.leads}</Text>
                  <Text style={commonStyles.metricLabel}>Leads</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.warning }]}>{metrics.conversion}</Text>
                  <Text style={commonStyles.metricLabel}>Conversion</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Traffic & Engagement */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Traffic & Engagement</Text>
            <View style={commonStyles.card}>
              <View style={styles.trafficGrid}>
                <View style={styles.trafficMetric}>
                  <Text style={[styles.trafficValue, { color: colors.primary }]}>{metrics.impressions}</Text>
                  <Text style={styles.trafficLabel}>Impressions</Text>
                </View>
                <View style={styles.trafficMetric}>
                  <Text style={[styles.trafficValue, { color: colors.secondary }]}>{metrics.clicks}</Text>
                  <Text style={styles.trafficLabel}>Clicks</Text>
                </View>
                <View style={styles.trafficMetric}>
                  <Text style={[styles.trafficValue, { color: colors.accent }]}>{metrics.ctr}</Text>
                  <Text style={styles.trafficLabel}>CTR</Text>
                </View>
                <View style={styles.trafficMetric}>
                  <Text style={[styles.trafficValue, { color: colors.warning }]}>{metrics.cpc}</Text>
                  <Text style={styles.trafficLabel}>CPC</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Channel Performance */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Channel Performance</Text>
            <View style={commonStyles.card}>
              {channelPerformance.map((channel, index) => (
                <View key={index} style={styles.channelItem}>
                  <View style={styles.channelInfo}>
                    <View style={[styles.channelDot, { backgroundColor: channel.color }]} />
                    <Text style={styles.channelName}>{channel.channel}</Text>
                  </View>
                  <View style={styles.channelMetrics}>
                    <Text style={styles.channelRevenue}>{channel.revenue}</Text>
                    <Text style={styles.channelPercentage}>{channel.percentage}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Top Performing Campaigns */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Top Performing Campaigns</Text>
            <View style={commonStyles.card}>
              {topPerformingCampaigns.map((campaign, index) => (
                <View key={index} style={styles.campaignItem}>
                  <Text style={styles.campaignName}>{campaign.name}</Text>
                  <Text style={[styles.campaignPerformance, { color: campaign.color }]}>
                    {campaign.performance}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* ROI Summary */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>Return on Investment</Text>
            <View style={commonStyles.card}>
              <View style={styles.roiContainer}>
                <View style={styles.roiMetric}>
                  <Text style={[styles.roiValue, { color: colors.success }]}>{metrics.roas}</Text>
                  <Text style={styles.roiLabel}>Return on Ad Spend</Text>
                </View>
                <View style={styles.roiDescription}>
                  <Text style={commonStyles.textSecondary}>
                    For every $1 spent on advertising, you&apos;re generating {metrics.roas} in revenue.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    padding: 8,
  },
  selectorContainer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  periodButtonTextActive: {
    color: 'white',
  },
  metricDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  trafficGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  trafficMetric: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 16,
  },
  trafficValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  trafficLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: 4,
  },
  channelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  channelDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  channelMetrics: {
    alignItems: 'flex-end',
  },
  channelRevenue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  channelPercentage: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  campaignItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    flex: 1,
  },
  campaignPerformance: {
    fontSize: 16,
    fontWeight: '600',
  },
  roiContainer: {
    alignItems: 'center',
  },
  roiMetric: {
    alignItems: 'center',
    marginBottom: 16,
  },
  roiValue: {
    fontSize: 36,
    fontWeight: '700',
  },
  roiLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: 4,
  },
  roiDescription: {
    paddingHorizontal: 16,
  },
});
