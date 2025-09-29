
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, TextInput } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { commonStyles, colors } from "@/styles/commonStyles";

interface Campaign {
  id: string;
  name: string;
  client: string;
  type: 'social' | 'email' | 'ppc' | 'seo';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: string;
  spent: string;
  impressions: string;
  clicks: string;
  startDate: string;
  endDate: string;
}

export default function CampaignsScreen() {
  console.log("Campaigns screen loaded");

  const [searchQuery, setSearchQuery] = useState("");
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Holiday Social Media Boost',
      client: 'TechCorp Inc.',
      type: 'social',
      status: 'active',
      budget: '$5,000',
      spent: '$3,200',
      impressions: '125K',
      clicks: '2.4K',
      startDate: '2024-12-01',
      endDate: '2024-12-31'
    },
    {
      id: '2',
      name: 'Email Newsletter Campaign',
      client: 'StartupXYZ',
      type: 'email',
      status: 'active',
      budget: '$2,000',
      spent: '$1,800',
      impressions: '45K',
      clicks: '1.2K',
      startDate: '2024-11-15',
      endDate: '2024-12-15'
    },
    {
      id: '3',
      name: 'Google Ads - Local Services',
      client: 'Local Business Co.',
      type: 'ppc',
      status: 'paused',
      budget: '$3,500',
      spent: '$2,100',
      impressions: '89K',
      clicks: '3.1K',
      startDate: '2024-11-01',
      endDate: '2024-12-01'
    },
    {
      id: '4',
      name: 'SEO Content Strategy',
      client: 'E-commerce Plus',
      type: 'seo',
      status: 'active',
      budget: '$4,000',
      spent: '$2,800',
      impressions: '200K',
      clicks: '5.2K',
      startDate: '2024-10-01',
      endDate: '2024-01-01'
    }
  ]);

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => {
        console.log("Add campaign pressed");
        router.push("/add-campaign");
      }}
      style={styles.headerButton}
    >
      <IconSymbol name="plus" color={colors.text} size={24} />
    </Pressable>
  );

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

  const getCampaignTypeIcon = (type: Campaign['type']) => {
    switch (type) {
      case 'social':
        return 'person.2';
      case 'email':
        return 'envelope';
      case 'ppc':
        return 'magnifyingglass';
      case 'seo':
        return 'chart.line.uptrend.xyaxis';
      default:
        return 'megaphone';
    }
  };

  const getCampaignTypeColor = (type: Campaign['type']) => {
    switch (type) {
      case 'social':
        return colors.primary;
      case 'email':
        return colors.secondary;
      case 'ppc':
        return colors.warning;
      case 'seo':
        return colors.accent;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return colors.success;
      case 'paused':
        return colors.warning;
      case 'completed':
        return colors.primary;
      case 'draft':
        return colors.textSecondary;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusText = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'paused':
        return 'Paused';
      case 'completed':
        return 'Completed';
      case 'draft':
        return 'Draft';
      default:
        return 'Unknown';
    }
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCampaign = (campaign: Campaign) => (
    <Pressable
      key={campaign.id}
      style={commonStyles.card}
      onPress={() => {
        console.log(`Campaign ${campaign.name} pressed`);
        router.push(`/campaign-details?id=${campaign.id}`);
      }}
    >
      <View style={styles.campaignHeader}>
        <View style={styles.campaignInfo}>
          <View style={styles.campaignTitleRow}>
            <View style={[styles.typeIcon, { backgroundColor: getCampaignTypeColor(campaign.type) }]}>
              <IconSymbol name={getCampaignTypeIcon(campaign.type) as any} color="white" size={16} />
            </View>
            <Text style={styles.campaignName}>{campaign.name}</Text>
          </View>
          <Text style={commonStyles.textSecondary}>{campaign.client}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(campaign.status) }]}>
          <Text style={styles.statusText}>{getStatusText(campaign.status)}</Text>
        </View>
      </View>

      <View style={styles.campaignMetrics}>
        <View style={commonStyles.row}>
          <View style={commonStyles.metric}>
            <Text style={commonStyles.metricValue}>{campaign.impressions}</Text>
            <Text style={commonStyles.metricLabel}>Impressions</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={commonStyles.metric}>
            <Text style={[commonStyles.metricValue, { color: colors.primary }]}>{campaign.clicks}</Text>
            <Text style={commonStyles.metricLabel}>Clicks</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={commonStyles.metric}>
            <Text style={[commonStyles.metricValue, { color: colors.success }]}>{campaign.spent}</Text>
            <Text style={commonStyles.metricLabel}>Spent</Text>
          </View>
        </View>
      </View>

      <View style={commonStyles.divider} />

      <View style={styles.campaignFooter}>
        <Text style={commonStyles.textSecondary}>
          Budget: {campaign.budget} • {campaign.startDate} - {campaign.endDate}
        </Text>
      </View>
    </Pressable>
  );

  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const totalBudget = campaigns.reduce((sum, c) => sum + parseInt(c.budget.replace(/[$,]/g, '')), 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + parseInt(c.spent.replace(/[$,]/g, '')), 0);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Campaigns",
          headerRight: renderHeaderRight,
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
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <IconSymbol name="magnifyingglass" color={colors.textSecondary} size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search campaigns..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Stats Overview */}
          <View style={commonStyles.section}>
            <View style={commonStyles.card}>
              <View style={commonStyles.row}>
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.primary }]}>{campaigns.length}</Text>
                  <Text style={commonStyles.metricLabel}>Total Campaigns</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.success }]}>{activeCampaigns}</Text>
                  <Text style={commonStyles.metricLabel}>Active</Text>
                </View>
                <View style={styles.metricDivider} />
                <View style={commonStyles.metric}>
                  <Text style={[commonStyles.metricValue, { color: colors.warning }]}>
                    ${(totalSpent / 1000).toFixed(1)}K
                  </Text>
                  <Text style={commonStyles.metricLabel}>Total Spent</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Campaigns List */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.sectionTitle}>All Campaigns</Text>
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map(renderCampaign)
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol name="megaphone" color={colors.textSecondary} size={48} />
                <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                  No campaigns found
                </Text>
                <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
                  {searchQuery ? 'Try adjusting your search' : 'Create your first campaign to get started'}
                </Text>
              </View>
            )}
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
  searchContainer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  campaignInfo: {
    flex: 1,
  },
  campaignTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  typeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  campaignMetrics: {
    marginBottom: 16,
  },
  campaignFooter: {
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
});
