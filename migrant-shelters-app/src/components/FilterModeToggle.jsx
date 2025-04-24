import React, { memo } from 'react';
import { Flex, Tooltip, Text } from '@radix-ui/themes';

export const FilterModeToggle = memo(({ filterMode, onChange }) => {
    const isAnyMode = filterMode === 'any';

    return (
        <Tooltip content={isAnyMode ? 'Match any filter (OR)' : 'Match all filters (AND)'}>
            <Flex className="filter-mode-button-container">
                <div
                    className={`filter-mode-button-segment ${!isAnyMode ? 'active' : ''}`}
                    onClick={() => onChange('all')}
                >
                    <Text size="1">All</Text>
                </div>
                <div
                    className={`filter-mode-button-segment ${isAnyMode ? 'active' : ''}`}
                    onClick={() => onChange('any')}
                >
                    <Text size="1">Any</Text>
                </div>

                <style jsx>{`
          .filter-mode-button-container {
            display: flex;
            height: 28px;
            border-radius: 6px;
            overflow: hidden;
            border: 1px solid var(--gray-5);
          }
          
          .filter-mode-button-segment {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 8px;
            cursor: pointer;
            background: var(--gray-3);
            transition: all 0.2s;
          }
          
          .filter-mode-button-segment:hover {
            background: var(--gray-4);
          }
          
          .filter-mode-button-segment.active {
            background: var(--blue-9);
            color: white;
          }
        `}</style>
            </Flex>
        </Tooltip>
    );
});