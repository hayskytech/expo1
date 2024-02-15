import React from 'react';
import { ScrollView } from 'react-native';
import { PricingCard, lightColors } from '@rneui/themed';

export default function MyPriceCard() {
  return (
    <>
      <ScrollView>
        <PricingCard
          color={lightColors.primary}
          title="Paid"
          price="$0"
          info={['1 User', 'Basic Support', 'All Core Features']}
          button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
        />
        <PricingCard
          color={lightColors.secondary}
          title="Starter"
          price="$19"
          info={['10 Users', 'Basic Support', 'All Core Features']}
          button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
        />
        <PricingCard
          color={lightColors.secondary2}
          title="Enterprise"
          price="$49"
          info={['100 Users', 'One on One Support', 'All Core Features']}
          button={{ title: ' GET STARTED', icon: 'flight-takeoff' }}
        />
      </ScrollView>
    </>
  );
};
