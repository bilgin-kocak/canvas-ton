// src/components/Profile.js
import React from 'react';
import { Card, Avatar, Button } from 'antd-mobile';
import { PlayOutline } from 'antd-mobile-icons';
import '@tonconnect/ui-react';

const NewProfile = () => {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#000',
        height: '100vh',
        color: '#fff',
      }}
    >
      <Card style={{ backgroundColor: '#000', border: 'none' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar style={{ backgroundColor: '#1890ff', marginBottom: '10px' }}>
            B
          </Avatar>
          <h2>bilginkocak</h2>
          <h1>฿ 2,251.200</h1>
          <div style={{ marginTop: '20px', width: '100%' }}>
            <Card style={{ backgroundColor: '#111', color: '#fff' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>Drop game</span>
                <Button
                  size="mini"
                  color="primary"
                  style={{ borderRadius: '20px' }}
                >
                  Play <PlayOutline />
                </Button>
              </div>
            </Card>
          </div>
          <div style={{ marginTop: '20px', width: '100%' }}>
            <Card style={{ backgroundColor: '#111', color: '#fff' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>Farming ฿ 43.176</span>
                <span>02h 00m</span>
              </div>
            </Card>
          </div>
        </div>
      </Card>
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Button
          size="large"
          style={{ flex: 1, backgroundColor: '#111', color: '#fff' }}
        >
          Home
        </Button>
        <Button
          size="large"
          style={{ flex: 1, backgroundColor: '#111', color: '#fff' }}
        >
          Tasks
        </Button>
        <Button
          size="large"
          style={{ flex: 1, backgroundColor: '#111', color: '#fff' }}
        >
          Frens
        </Button>
      </div>
    </div>
  );
};

export default NewProfile;
