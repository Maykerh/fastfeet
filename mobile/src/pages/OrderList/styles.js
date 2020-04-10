import styled from 'styled-components/native';

import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    padding: 0 30px;
`;

export const Header = styled.View`
    margin: 10px 0;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 90px;
`;

export const HeaderTextWrapper = styled.View`
    flex-direction: column;
    margin: 0 10px;
    flex: 1;
`;

export const WelcomeText = styled.Text`
    color: #7b7b7b;
    font-size: 16px;
`;

export const UserName = styled.Text`
    color: #383838;
    font-size: 30px;
    font-weight: bold;
`;

export const LogoutButton = styled(TouchableOpacity)`
    right: 0;
`;

export const Grid = styled.View`
    flex: 1;
    width: 100%;
`;

export const GridHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 5px;
    height: 45px;
`;

export const GridFilters = styled.View`
    flex-direction: row;
`;

export const GridTitle = styled.Text`
    color: #383838;
    font-size: 30px;
    font-weight: bold;
`;

export const FilterButton = styled.Text`
    color: ${(props) => (props.active ? '#7159c1' : '#7b7b7b')};
    text-decoration: ${(props) => (props.active ? 'underline' : 'none')};
    font-size: 16px;
    margin-left: 15px;
    font-weight: bold;
`;

export const GridBody = styled.View`
    width: 100%;
    flex: 1;
    height: auto;
`;

export const StyledOrderList = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
    /* margin-bottom: 200px; */
`;

export const EmptyState = styled.View`
    justify-content: center;
    flex: 1;
    align-items: center;
`;

export const EmptyStateText = styled.Text`
    color: #383838;
    font-size: 25px;
    font-weight: bold;
`;
