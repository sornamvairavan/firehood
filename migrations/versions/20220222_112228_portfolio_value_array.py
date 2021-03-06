"""portfolio_value_array

Revision ID: 62695ba7e763
Revises: f10ab4197d13
Create Date: 2022-02-22 11:22:28.173328

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '62695ba7e763'
down_revision = 'f10ab4197d13'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('portfolio_value', sa.ARRAY(sa.String()), nullable=True))
    op.add_column('users', sa.Column('updated_at', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'updated_at')
    op.drop_column('users', 'portfolio_value')
    # ### end Alembic commands ###
